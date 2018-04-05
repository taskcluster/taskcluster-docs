var fs = require('fs');
var path = require('path');
var through = require('through2');
var rename = require('gulp-rename');
var File = require('vinyl');
var ejs = require('ejs');
var log = require('fancy-log');

/**
 * The static build process will create a directory with
 *
 * - nginx-site.conf -- configuration
 * - app/ -- static site data
 *
 * The configuration file assumes that app will be avialable on the
 * running fileystem at /app.
 */

/**
 * Add the nginx configuration.  This should come before setFilenames, as it filters out
 * items which are represented in config rather than on disk, like redirects
 */
exports.createNginxConfig = () => {
  const redirects = [];

  return through.obj(function (file, enc, cb) {
    // ignore non-redirects
    if (!file.data || !file.data.headers || !file.data.headers['website-redirect-location']) {
      return cb(null, file);
    }
    redirects.push({from: file.path, to: file.data.headers['website-redirect-location']});
    cb();
  }, function (cb) {
    log(`creating nginx configuration`);
    const conf = ejs.render(fs.readFileSync(path.join(__dirname, 'nginx-site.conf.ejs')).toString(), {
      redirects,
    });
    this.push(new File({
      base: '.',
      cwd: '.',
      path: 'nginx-site.conf',
      contents: Buffer.from(conf, 'utf-8'),
    }));
    cb();
  });
};

/**
 * Set filenames for all files.
 *
 * These are either `name.html` or `/index.html` for the root.  The nginx config
 * will reverse this particular transformation.
 *
 * This adds the `app/` prefix, too.
 */
exports.setFilenames = () => {
  return through.obj(function (file, enc, cb) {
    if (file.path === 'nginx-site.conf') {
      return cb(null, file);
    }

    let filename;
    if (path.extname(file.path) === '') {
      filename = file.relative === '' ? 'index.html' : `${file.relative}.html`;
    } else {
      filename = file.relative;
    }
    file.cwd = '.';
    file.base = '.'
    file.path = `app/${filename}`;
    cb(null, file);
  });
  return rename(function (p) {
    if (p.extname === '') {
      p.dirname = path.join('app', p.dirname, p.basename);
      if (p.basename === '') {
        p.basename = 'index';
      }
      p.extname = '.html';
    }
  });
};

