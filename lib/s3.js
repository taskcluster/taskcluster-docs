var through = require('through2');
var request = require('request');
var sts = require('./sts');
var awspublish = require('gulp-awspublish');
var XML = require('pixl-xml');
var Promise = require('promise');

/**
 * Make a new awspublish publisher
 *
 * Returns a Promise that resolves with a publisher
 */
exports.makePublisher = function() {
  var bucket = process.env['PUBLISH_BUCKET'];
  var region = process.env['PUBLISH_REGION'];
  if (!bucket || !region) {
    console.error("Must specify PUBLISH_BUCKET and PUBLISH_REGION");
    process.exit(1);
  }

  return sts("read-write", bucket).then(function(creds) {
    return awspublish.create({
      region: region,
      params: {
        Bucket: bucket,
      },
      credentials: creds,
    });
  });
}

/**
 * Get all files in a public bucket
 */
exports.getPublicFiles = function(bucket) {
  var endpoint = 'https://' + bucket + '.s3.amazonaws.com/';
  return new Promise(function(accept, reject) {
    request.get(
      endpoint,
      function(err, res, body) {
        if (err) {
          reject(err);
        } else if (res.statusCode != 200) {
          reject(body);
        } else {
          accept(XML.parse(body).Contents.map(function(k) {return endpoint + k.Key}));
        };
      });
  });
};

/**
 * Copy data.headers to s3.headers
 */
exports.setHeaders = function() {
  return through.obj(function(file, enc, cb) {
    var path = file.relative;
    // serve the root as 'index.html', per S3 website hosting
    if (!path) {
      path = 'index.html';
    }
    // S3's website hosting will serve `XXX/index.html` when `XXX/` is requested, so
    // reverse that transformation here.  `file.relative` strips the trailing
    // slash, so we have to look at `file.path`.
    if (!path || file.path.endsWith('/')) {
      path = file.relative + '/index.html';
    }
    file.s3 = {
      headers: file.data.headers || {},
      path: path
    };
    cb(null, file);
  }, function(cb) {
    cb();
  });
}
