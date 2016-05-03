var through = require('through2');
var _ = require('lodash');
var mime = require('mime');

/**
 * Set a header in `file.data.headers`
 */
exports.set = function(header, value) {
  return through.obj(function(file, enc, cb) {
    file.data = file.data || {};
    if (!file.data.headers) {
      file.data.headers = {};
    }
    file.data.headers[header] = value;
    cb(null, file);
  }, function(cb) {
    cb();
  });
}

/**
 * Set a file's content-type header based on its filename
 */
exports.guessContentType = function() {
  return through.obj(function(file, enc, cb) {
    file.data = file.data || {};
    if (!file.data.headers) {
      file.data.headers = {};
    }
    file.data.headers['Content-Type'] = mime.lookup(file.relative);
    cb(null, file);
  }, function(cb) {
    cb();
  });
}
