var through = require('through2');
var fs = require('fs');
var path = require('path');
var streamfilter = require('streamfilter');

/**
 * Include only Gulp files that are files (not directories, etc.)
 */
exports.onlyFiles = function() {
  return new streamfilter(function (file, enc, cb) {
    var stat = fs.statSync(path.relative(file.cwd, file.path));
    cb(!stat.isFile());
  }, {
    objectMode: true,
  })
}

/**
 * Rename files ending in `/index.html` to drop the prefix
 */
exports.renameIndex = function() {
  return through.obj(function (file, enc, cb) {
    if (file.path.endsWith('/index.html')) {
      file.path = file.path.slice(0, -11);
    }
    cb(null, file);
  }, function(cb) {
    cb();
  });
}
