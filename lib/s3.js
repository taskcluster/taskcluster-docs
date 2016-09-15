var through = require('through2');
var sts = require('./sts');
var awspublish = require('gulp-awspublish');
var AWS = require('aws-sdk');
var vs3 = require('vinyl-s3');

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
 * Make a new downloader for taskcluster-lib-docs tarballs
 */
exports.makeDownloader = function(bucket, region) {
  return sts("read-only", bucket).then(function(creds) {
    var s3 = new AWS.S3({
      region: region,
      params: {
        Bucket: bucket,
      },
      credentials: creds,
    });
    return vs3.src("s3://" + bucket + "/*/latest.tar.gz", {s3: s3});
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
