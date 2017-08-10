var gulp = require('gulp');
var path = require('path');
var url = require('url');
var markdown = require('gulp-markdown');
var merge = require('merge-stream');
var rename = require('gulp-rename');
var data = require('gulp-data');
var clean = require('gulp-clean');
var gunzip = require('gulp-gunzip');
var untar = require('gulp-untar');
var fileInclude = require('gulp-file-include');
var virtual_webserver = require('./lib/virtual-webserver');
var pug = require('./lib/pug');
var frontmatter = require('gulp-front-matter');
var awspublish = require('gulp-awspublish');
var headers = require('./lib/headers');
var filter = require('./lib/filter');
var navlinks = require('./lib/navlinks');
var makeRedirects = require('./lib/make-redirects');
var s3 = require('./lib/s3');
var raw = require('./lib/raw');
var download = require('gulp-download-stream');
var userlist = require('./lib/userlist');

function stripHtml(path) {
  if (path.extname === '.html' || path.extname === '.json') {
    path.extname = '';
  }
}

// define streams creating each type of file
function index() {
  return gulp
    .src('src/index.md', {base: 'src'})
    .pipe(frontmatter({property: 'data'}))
    .pipe(markdown())
    .pipe(filter.renameIndex())
    .pipe(rename(stripHtml))
    .pipe(pug({template: 'layout/layout.pug'}))
    .pipe(headers.set('Content-Type', 'text/html'))
}

function resources() {
  return gulp
    .src('src/resources.md', {base: 'src'})
    .pipe(frontmatter({property: 'data'}))
    .pipe(markdown())
    .pipe(filter.renameIndex())
    .pipe(rename(stripHtml))
    .pipe(pug({template: 'layout/layout.pug'}))
    .pipe(headers.set('Content-Type', 'text/html'))
}

function people() {
  return gulp
    .src('src/people.pug', {base: 'src'})
    .pipe(frontmatter({property: 'data'}))
    .pipe(userlist({template: 'layout/people.pug'}))
    .pipe(filter.renameIndex())
    .pipe(rename(stripHtml))
    .pipe(pug({template: 'layout/layout.pug'}))
    .pipe(headers.set('Content-Type', 'text/html'))
}

function error() {
  return gulp
    .src('src/error.md', {base: 'src'})
    .pipe(frontmatter({property: 'data'}))
    .pipe(markdown())
    .pipe(filter.renameIndex())
    .pipe(rename(stripHtml))
    .pipe(pug({template: 'layout/layout.pug'}))
    .pipe(headers.set('Content-Type', 'text/html'))
}

function tutorial() {
  return gulp
    .src('src/tutorial/**/*.md', {base: 'src'})
    .pipe(frontmatter({property: 'data'}))
    .pipe(markdown())
    .pipe(filter.renameIndex())
    .pipe(rename(stripHtml))
    .pipe(pug({template: 'layout/layout.pug'}))
    .pipe(headers.set('Content-Type', 'text/html'))
}

function manual() {
  return merge(
    gulp
      .src('src/manual/**/*.md', {base: 'src'})
      .pipe(fileInclude())
      .pipe(frontmatter({property: 'data'}))
      .pipe(markdown())
      .pipe(filter.renameIndex())
      .pipe(rename(stripHtml))
      .pipe(navlinks({rootPath: '/manual'}))
      .pipe(pug({template: 'layout/layout.pug'}))
      .pipe(headers.set('Content-Type', 'text/html')),
    gulp
      .src('src/manual/**/*.yml', {base: 'src'})
      .pipe(headers.set('Content-Type', 'text/x-yaml'))
  )
}

function reference() {
  return merge(
    gulp.src(['build/reference/*/docs/*', '!build/reference/*/docs/*.md'], {base: 'build'})
      .pipe(raw()),
    merge(
      gulp.src(['build/reference/*/references/*.json'], {base: 'build'})
        .pipe(raw()),
      merge(
        gulp.src('src/reference/**/*.md', {base: 'src'}),
        gulp.src('build/reference/**/*.md', {base: 'build'}).pipe(raw())
      )
      .pipe(frontmatter({property: 'data'}))
      .pipe(markdown())
      .pipe(filter.renameIndex())
    )
    .pipe(rename(stripHtml))
    .pipe(navlinks({rootPath: '/reference'}))
    .pipe(pug({template: 'layout/layout.pug'}))
    .pipe(headers.set('Content-Type', 'text/html'))
  );
}

function assets() {
  return gulp
    .src('src/assets/**', {base: 'src'})
    .pipe(filter.onlyFiles())
    .pipe(headers.guessContentType())
}

function redirects() {
  return gulp
    .src('redirects.yml')
    .pipe(makeRedirects())
}

function presentations() {
  return merge(
    gulp
      .src('src/presentations/**', {base: 'src'})
      .pipe(filter.onlyFiles())
      .pipe(headers.guessContentType()),
    gulp
      .src('src/presentations/index.md', {base: 'src'})
      .pipe(frontmatter({property: 'data'}))
      .pipe(markdown())
      .pipe(rename({dirname: 'presentations', basename: ''}))
      .pipe(rename(stripHtml))
      .pipe(pug({template: 'layout/layout.pug'}))
      .pipe(headers.set('Content-Type', 'text/html'))
  )
}

// a stream creating the entire site
function site() {
  return merge(
    index(),
    resources(),
    people(),
    error(),
    tutorial(),
    manual(),
    reference(),
    assets(),
    presentations(),
    redirects()
  )
}

gulp.task('check', function() {
  return site();
});

gulp.task('webserver', function() {
  return site().pipe(virtual_webserver({debug: true}));
});

gulp.task('publish', function() {
  return s3.makePublisher().then(function(publisher) {
    return site()
      .pipe(s3.setHeaders())
      .pipe(publisher.publish({}, {noAcl: true}))
      .pipe(publisher.cache())
      .pipe(awspublish.reporter())
  });
});

gulp.task('clean-build', function() {
  return gulp.src('build', {read: false})
    .pipe(clean());
});

// We don't depend on this to avoid having to redownload
// every time during development. I'm sure we can come up
// with some way to do modified times and intelligently
// redownload if we want, but I don't want to right now.
gulp.task('download', ['clean-build'], function() {
  return s3.getPublicFiles('taskcluster-raw-docs').then(function(files) {
    files = files.map(function(remote) {
      return {
        url: remote,
        file: 'reference' + url.parse(remote).pathname,
      };
    });
    download(files)
      .pipe(gunzip())
      .pipe(untar())
      .pipe(rename(function(path) {
        // This handles a misformatting we introduced into some lib-docs tarballs
        // if the tarball has everything inside a directory with the name of the
        // service, we want to strip it out and put it at the root
        // i.e. references/auth/auth/metadata.json -> references/auth/metadata.json
        var dname = path.dirname.split('/');
        if (dname.length > 2 && dname[1] === dname[2]) {
          dname.splice(2, 1);
        }
        path.dirname = dname.join('/');
      }))
      .pipe(gulp.dest('build'));
  });
});

gulp.task('default', ['webserver']);
