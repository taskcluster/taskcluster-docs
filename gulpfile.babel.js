require('babel-polyfill');
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var merge = require('merge-stream');
var rename = require('gulp-rename');
var data = require('gulp-data');
var clean = require('gulp-clean');
var virtual_webserver = require('./lib/virtual-webserver');
var pug = require('./lib/pug');
var frontmatter = require('gulp-front-matter');
var awspublish = require('gulp-awspublish');
var headers = require('./lib/headers');
var filter = require('./lib/filter');
var navlinks = require('./lib/navlinks');
var makeRedirects = require('./lib/make-redirects');
var s3 = require('./lib/s3');
var {getTarball, transformDocs} = require('./lib/tarball');
var {extract} = require('tar-vinyl-stream');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');
var exhaustively = require('stream-exhaust');

// define streams creating each type of file
function index() {
  return gulp
    .src('src/index.md', {base: 'src'})
    .pipe(frontmatter({property: 'data'}))
    .pipe(markdown())
    .pipe(filter.renameIndex())
    .pipe(rename({extname: ''}))
    .pipe(pug({template: 'layout/index.pug'}))
    .pipe(headers.set('Content-Type', 'text/html'))
}

function error() {
  return gulp
    .src('src/error.md', {base: 'src'})
    .pipe(frontmatter({property: 'data'}))
    .pipe(markdown())
    .pipe(filter.renameIndex())
    .pipe(rename({extname: ''}))
    .pipe(pug({template: 'layout/layout.pug'}))
    .pipe(headers.set('Content-Type', 'text/html'))
}

function tutorial() {
  return gulp
    .src('src/tutorial/**/*.md', {base: 'src'})
    .pipe(frontmatter({property: 'data'}))
    .pipe(markdown())
    .pipe(filter.renameIndex())
    .pipe(rename({extname: ''}))
    .pipe(pug({template: 'layout/layout.pug'}))
    .pipe(headers.set('Content-Type', 'text/html'))
}

function manual() {
  return gulp
    .src('src/manual/**/*.md', {base: 'src'})
    .pipe(frontmatter({property: 'data'}))
    .pipe(markdown())
    .pipe(filter.renameIndex())
    .pipe(rename({extname: ''}))
    .pipe(navlinks({rootPath: '/manual'}))
    .pipe(pug({template: 'layout/layout.pug'}))
    .pipe(headers.set('Content-Type', 'text/html'))
}

function reference() {
  return gulp
    .src('src/reference/**/*.md', {base: 'src'})
    .pipe(frontmatter({property: 'data'}))
    .pipe(markdown())
    .pipe(filter.renameIndex())
    .pipe(rename({extname: ''}))
    .pipe(navlinks({rootPath: '/reference'}))
    .pipe(pug({template: 'layout/layout.pug'}))
    .pipe(headers.set('Content-Type', 'text/html'))
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
      .pipe(rename({dirname: 'presentations', basename: '', extname: ''}))
      .pipe(pug({template: 'layout/layout.pug'}))
      .pipe(headers.set('Content-Type', 'text/html'))
  )
}

/**
 * Collect all projects' metadata and generate reference pages including table of contents
 */
async function generateReferencePages() {

  // this pipe will process all html files and
  // will insert the pages into a layout
  let htmlStream = lazypipe()
  .pipe(filter.renameIndex)
  .pipe(rename, {extname: ''})
  .pipe(navlinks, {rootPath: '/reference'})
  .pipe(pug, {template: 'layout/layout.pug'})
  .pipe(headers.set, 'Content-Type', 'text/html');

  let jsonStream = lazypipe()
  .pipe(headers.set, 'Content-Type', 'application/json');

  let markdownStream = lazypipe()
  .pipe(frontmatter, {property: 'data'})
  .pipe(markdown);

  // convertor stream turns the tarball output into files
  // to be processed before they are served or published
  let converterStream = lazypipe()
  .pipe(transformDocs)
  .pipe(() => {
    // have to filter again, because transformDocs
    // might return HTML for schemas because of docson
    return gulpif("*.json", jsonStream());
  });

  // stream of all reference documents to be generated
  let streams = merge();

  // download all tarballs and add to streams
  let tarballProjects = ['taskcluster-github', 'purge-cache'];
  let promises = [];
  for (let project of tarballProjects) {
    promises.push(getTarball(project).then(tarStream => {
      let tarPipe = tarStream
      .pipe(extract())
      .pipe(converterStream())
      .pipe(gulpif('*.md', markdownStream()));
      streams.add(tarPipe);
    }));
  }

  // download all tarballs in parallel
  await Promise.all(promises);

  // add reference index pages
  streams.add(gulp.src('src/reference/index.md', {base: 'src'})
  .pipe(markdownStream()));

  // add index page for core | platform | library
  streams.add(gulp.src('src/reference/*/index.md', {base: 'src'})
  .pipe(markdownStream()));

  // apply all html's in layout and return
  return streams.pipe(gulpif("*.html", htmlStream()));
}

// a stream creating the entire site
async function site() {
  let s = merge(
    index(),
    error(),
    tutorial(),
    manual(),
    assets(),
    presentations(),
    redirects()
  );
  let refPipe = await generateReferencePages();
  s.add(refPipe);
  return s;
}

gulp.task('check', () => {
  return site();
});

gulp.task('publish', async () => {
  let publisher = s3.makePublisher();
  let s = await site();
  return exhaustively(s.pipe(s3.setHeaders())
    .pipe(publisher.publish({}, {noAcl: true}))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter()));
});

gulp.task('webserver', async () => {
  let s = await site();
  // use exhaustively to start gulp streams
  return exhaustively(s.pipe(virtual_webserver({debug: true})));
});
