var request = require('request');
var Promise = require('promise');
var taskcluster = require('taskcluster-client');

function creds(level, bucket) {
  return new Promise(function(accept, reject) {
    request.get(
      'http://taskcluster/auth/v1/aws/s3/' + level + '/' + bucket + '/',
      function(err, res, body) {
        if (err) {
          reject(err);
        } else if (res.statusCode != 200) {
          reject(body);
        } else {
          var creds = JSON.parse(body).credentials;
          console.error("AWS credentials for " + bucket + " downloaded; accessKeyId is " + creds.accessKeyId);
          accept(creds);
        };
      });
  });
}

module.exports = creds;
