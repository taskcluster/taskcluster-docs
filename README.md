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
