var through = require('through2');
var yaml = require('js-yaml');
var fs = require('fs');
var _ = require('lodash');
var gutil = require('gulp-util');
var File = require('vinyl');

/**
 * Generate a stream of fake "Files" representing the redirects in the
 * mapping file it gets as input.
 */

module.exports = function() {
  return through.obj(function(file, enc, cb) {
    var mapping = yaml.safeLoad(file.contents.toString());
    var self = this;

    // redirect /docs/ to /docs
    const rootRedir = new File({
      base: '/',
      path: '/docs/',
      contents: new Buffer(""),
    });
    rootRedir.data = {
      headers: {'website-redirect-location': '/docs'},
    };
    self.push(rootRedir);

    _.forEach(mapping, function (newPath, oldPath) {
      // redirect both from <path> and docs/<path>
      _.forEach(['', '/docs'], function (prefix) {
        var file = new File({
          base: '/',
          path: prefix + oldPath,
          contents: new Buffer(""),
        });
        file.data = {
          headers: {'website-redirect-location': newPath},
        };
        self.push(file);
      });
    });
    cb();
  }, function(cb) {
    cb();
  });
}
