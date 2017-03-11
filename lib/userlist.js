"use strict";
var gutil = require('gulp-util');
var through = require('through2');
var Mozillians = require('mozillians-client');
var yaml = require('js-yaml');
var pug = require('pug');
var taskcluster = require('taskcluster-client');

// Take a file containing a PUG template, along with file.data.people containing
// a list of mozillians usernames, and produce HTML output.
module.exports = function (options) {
  return through.obj(function (file, enc, cb) {
    peoplePage(file.data.people, file.contents, options).then(contents => {
      file.contents = contents;
      file.path = gutil.replaceExtension(file.path, '.html');
      cb(null, file);
    }, err => {
      console.log("err", err);
      cb(err, null);
    });
  });
};

var getApiKey = () => {
  if (process.env.MOZILLIANS_API_KEY) {
    return Promise.resolve(process.env.MOZILLIANS_API_KEY);
  }

  if (process.env.MOZILLIANS_SECRET) {
    var secrets = new taskcluster.Secrets({baseUrl: 'http://taskcluster/secrets/v1/'});
    return secrets.get(process.env.MOZILLIANS_SECRET).then(secret => secret.secret['api-key']);
  }

  gutil.log('WARNING: $MOZILLIANS_API_KEY is not set; not generating mozillians links');
  return Promise.resolve(null);
}

var peoplePage = (people, template, options) => {
  var peoplePromise;

  return getApiKey().then(api_key => {
    if (!api_key) {
      return Promise.resolve(people.map(username => ({username})));
    }
    // collect details from the Mozillians API
    let mozillians = new Mozillians(api_key, {});
    return Promise.all(people.map(username =>
      // fetch the user
      mozillians.users({username})
        .then(res => {
          if (res.count !== 1) {
            gutil.log('Mozillians user ' + username + ' not found - is the account public?');
            return {username};
          }
          // fetch the user details
          return res.results[0].details();
        })
        // filter out non-public details
        .then(details => {
          Object.keys(details).forEach(prop => {
            var val = details[prop];
            if (typeof val === "object" && 'privacy' in val && val.privacy !== 'Public') {
              delete details[prop];
            }
            // values we don't have access to are usually empty
            if (typeof val === 'object' && val.value === '') {
              delete details[prop];
            }
          });
          if (details.external_accounts) {
            details.external_accounts = details.external_accounts.filter(
                acct => acct.privacy !== 'Mozillians');
          }
          return details;
        })
    ));
  }).then(people => new Buffer(pug.render(template, {people})));
};
