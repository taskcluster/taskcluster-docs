# Taskcluster Documentation Site


This is the Taskcluster documentation site, hosted at `/docs` within a Taskcluster deployment.
It's a basic static site, generated with some Gulp plugins.

Development Setup
-----------------

  1. Copy `user-config-example.yml` into `user-config.yml` and fill in the blanks. _Note: This config is only used during development!_
  2. Install: `npm install` or `yarn`
  3. [Optional] If you want remote references locally, run `npm run download` or `yarn download`.
  4. Run the webserver: `npm start` or `yarn start`.
    * Note that it does not auto-reload on change.

Deployment
----------

This site is deployed using Nginx, serving static content. Build the static
content with `gulp build-static`, or if you want to run the webserver right
away, use `gulp webserver`.

Note that we still support the "old way" as well, so much of the site is
designed around producing objects to upload to S3, and then reverse-engineered
into static files for Nginx.

Reporting Issues
----------------

Please report issues in [Bugzilla](https://bugzilla.mozilla.org) in
the [Taskcluster :: Documentation](https://bugzilla.mozilla.org/enter_bug.cgi?assigned_to=nobody%40mozilla.org&bug_file_loc=http%3A%2F%2F&bug_ignored=0&bug_severity=normal&bug_status=NEW&cf_fx_iteration=---&cf_fx_points=---&component=Documentation&contenttypemethod=autodetect&contenttypeselection=text%2Fplain&defined_groups=1&flag_type-37=X&flag_type-4=X&flag_type-607=X&flag_type-787=X&flag_type-800=X&flag_type-803=X&form_name=enter_bug&maketemplate=Remember%20values%20as%20bookmarkable%20template&op_sys=Unspecified&priority=--&product=Taskcluster&rep_platform=Unspecified&target_milestone=---&version=unspecified)
component.

Publishing (Old Way)
--------------------

This is done automatically, but for the record: `npm run deploy` or `yarn deploy`.

Third-Party Libraries and Tools
-------------------------------
The Taskcluster Documentation Site wouldn't have been so awesome without these
amazing libraries and tools, upon which it is built.

**Libraries**,

 * `ejs_production.js` from [EJS](http://embeddedjs.com/) is licensed under the
   MIT License,
 * `jquery.min.js` from [jQuery](https://jquery.org) is licensed under the MIT
   license,
 * `marked.js` from [marked](https://github.com/chjj/marked) is licensed under
   the MIT license,
 * `raphael-min.js` from [Raphael](http://raphaeljs.com/) is licensed under
   the MIT license.
 * `sequence-diagram-min.js` from [JS Sequence Diagrams]
   (https://github.com/bramp/js-sequence-diagrams) is licensed under the
   Simplified BSD License.
 * Files in `bootstrap/` from [Bootstrap](http://getbootstrap.com/) is licensed
   under the MIT license.
 * Files in `bootstrap-select/` from [bootstrap-select]
   (https://github.com/silviomoreto/bootstrap-select) is licensed under the
   MIT license.
 * `promise.js` is from [es6-promises by Jake Archibald]
   (https://github.com/jakearchibald/es6-promise) is licensed under the MIT
   license.
