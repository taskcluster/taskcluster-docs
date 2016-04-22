var express = require('express');
var morgan = require('morgan');
var through = require('through2');
var gutil = require('gulp-util');

/**
 * serve files at their relative pathnames.
 *
 * This differs from gulp-webserver in that it does NOT read from disk,
 *
 * Headers are sent based on file.data.headers
 */
module.exports = function (options) {
  options = options || {};

  var app = express();
  app.use(morgan('combined'));

  return through.obj(function(file, enc, cb) {
    var headers = {};
    if (file.data && file.data.headers) {
      headers = file.data.headers;
    }
    if (options.debug) {
      gutil.log("/" + file.relative + ": " + JSON.stringify(headers));
    }
    app.get("/" + file.relative, function(req, res, next) {
      // handle redirects the way Amazon S3 does
      if (headers['website-redirect-location']) {
        res.set({location: headers['website-redirect-location']});
        res.sendStatus(302);
      } else {
        res.set(headers);
        file.pipe(res);
      }
    });
    cb(null, file);
  }, function(cb) {
    var port = options.port || 8000;

    var server = app.listen(port);
    server.on('listening', function() {
      gutil.log("serving on port", port);
    });
    server.on('close', cb);
  });
}
