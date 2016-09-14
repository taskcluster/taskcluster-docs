var request = require('request');

var level = process.argv[2];
var bucket = process.argv[3];

request.get(
    'http://taskcluster/auth/v1/aws/s3/' + level + '/' + bucket + '/',
    function(err, res, body) {
      if (err) {
        console.error(err);
        process.exit(1);
      } else if (res.statusCode != 200) {
        console.error(body)
        process.exit(1);
      } else {
        var creds = JSON.parse(body).credentials;
        console.error("AWS credentials for " + bucket + " downloaded; accessKeyId is " + creds.accessKeyId);
        console.log("export AWS_ACCESS_KEY_ID=" + creds.accessKeyId + '; ');
        console.log("export AWS_SECRET_ACCESS_KEY=" + creds.secretAccessKey + '; ');
        console.log("export AWS_SESSION_TOKEN=" + creds.sessionToken);
      }
    });
