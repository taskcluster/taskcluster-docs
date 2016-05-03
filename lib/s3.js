var through = require('through2');
var awspublish = require('gulp-awspublish');

/**
 * Make a new awspublish publisher
 */
exports.makePublisher = function() {
  var bucket = process.env['PUBLISH_BUCKET'];
  if (!bucket) {
    console.error("Must specify PUBLISH_BUCKET (and some of AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN, and AWS_PROFILE)");
    process.exit(1);
  }

  return awspublish.create({
    region: 'us-east-1',
    params: {
      Bucket: bucket,
    },
  });
}

/**
 * Copy data.headers to s3.headers
 */
exports.setHeaders = function() {
  return through.obj(function(file, enc, cb) {
    file.s3 = {
      headers: file.data.headers || {},
      path: file.relative || 'index.html',
    };
    cb(null, file);
  }, function(cb) {
    cb();
  });
}
