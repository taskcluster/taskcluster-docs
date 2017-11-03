# Taskcluster Documentation Site


This is the Taskcluster documentation site, hosted at https://docs.taskcluster.net.
It's a basic static site, generated with some Gulp plugins.

Development Setup
-----------------

  1. Copy `user-config-example.yml` into `user-config.yml` and fill in the blanks. _Note: This config is only used during development!_
  2. Install: `npm install` or `yarn`
  3. [Optional] If you want remote references locally, run `npm run download` or `yarn download`.
  4. Run the webserver: `npm start` or `yarn start`.
    * Note that it does not auto-reload on change.

Publishing
----------

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
 * `superagent-promise.js` is a [browserify](http://browserify.org/) bundle of
   [superagent](https://github.com/visionmedia/superagent),
   [superagent-promise](https://github.com/lightsofapollo/superagent-promise)
   and [promise](https://github.com/then/promise) all licensed under MIT.
 * Files in `bootstrap/` from [Bootstrap](http://getbootstrap.com/) is licensed
   under the MIT license.
 * Files in `bootstrap-select/` from [bootstrap-select]
   (https://github.com/silviomoreto/bootstrap-select) is licensed under the
   MIT license.
 * Files in `docson/` from [Docson](https://github.com/lbovet/docson) is
   licensed under the Apache License, Version 2.
 * `promise.js` is from [es6-promises by Jake Archibald]
   (https://github.com/jakearchibald/es6-promise) is licensed under the MIT
   license.
