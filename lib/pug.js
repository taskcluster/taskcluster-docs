var through = require('through2');
var _ = require('lodash');
var pug = require('pug');

/**
 * Embed the file contents (assumed to be HTML) into
 * the Pug template named by options.template.  The file's data
 * is used as template options.
 */
module.exports = function(options) {
  var template = options.template;

  return through.obj(function(file, enc, cb) {
    var params = _.defaults({}, file.data || {}, {
      content: file.contents.toString(),
      path: '/' + file.relative,
    });
    file.contents = new Buffer(pug.renderFile(template, params));
    cb(null, file);
  }, function(cb) {
    cb();
  });
}
