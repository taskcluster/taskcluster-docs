"use strict";
var gutil = require('gulp-util');
var through = require('through2');
var Mozillians = require('mozillians-client');
var yaml = require('js-yaml');
var pug = require('pug');

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

var peoplePage = (people, template, options) => {
  var peoplePromise;
  if (!process.env.MOZILLIANS_API_KEY) {
    gutil.log('WARNING: $MOZILLIANS_API_KEY is not set; not generating mozillians links');
    peoplePromise = Promise.resolve(people.map(username => ({username})));
  } else {
    // collect details from the Mozillians API
    let mozillians = new Mozillians(process.env.MOZILLIANS_API_KEY, {});
    peoplePromise = Promise.all(people.map(username =>
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
  }

  return peoplePromise.then(people => {
    var params = {
      people,
    };
    return new Buffer(pug.render(template, params));
  });
};
