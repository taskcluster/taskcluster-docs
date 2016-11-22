# TaskCluster Documentation Site


This is the TaskCluster documentation site, hosted at https://docs.taskcluster.net.
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
The TaskCluster Documentation Site wouldn't have been so awesome without these
amazing libraries and tools, upon which it is built.

**Libraries**,

 * `d3.v3.min.js` from [d3js](http://d3js.org/) licensed under the
    [BSD License](http://opensource.org/licenses/BSD-3-Clause),
 * `dagre-d3.min.js` from [dagre-d3](https://github.com/cpettitt/dagre-d3)
   licensed under the MIT License,
 * `ejs_production.js` from [EJS](http://embeddedjs.com/) is licensed under the
   MIT License,
 * `highlight.css` from [Pygments](http://pygments.org/) is licensed under the
   BSD license,
 * `jquery.min.js` from [jQuery](https://jquery.org) is licensed under the MIT
   license,
 * `jsonform.js` from [JSONForm](https://github.com/joshfire/jsonform) is
   licensed under the MIT license,
 * `marked.js` from [marked](https://github.com/chjj/marked) is licensed under
   the MIT license,
 * `moment.min.js` from [momentjs](http://momentjs.com/) is licensed under the
   MIT license,
 * `prism.js` and `prism.css` from [PRISM](http://prismjs.com/) is licensed
   under the MIT license.
 * `raphael-min.js` from [Raphael](http://raphaeljs.com/) is licensed under
   the MIT license.
 * `sequence-diagram-min.js` from [JS Sequence Diagrams]
   (https://github.com/bramp/js-sequence-diagrams) is licensed under the
   Simplified BSD License.
 * `superagent-promise.js` is a [browserify](http://browserify.org/) bundle of
   [superagent](https://github.com/visionmedia/superagent),
   [superagent-promise](https://github.com/lightsofapollo/superagent-promise)
   and [promise](https://github.com/then/promise) all licensed under MIT.
 * `term.js` from [term.js](https://github.com/chjj/term.js/) is licensed
   under the MIT license.
 * `underscore-min.js` from [underscore.js](http://underscorejs.org/) is
   licensed under the MIT license.
 * Files in `ace/` are from [Ace](http://ace.c9.io/) is licensed under the
   BSD license.
 * Files in `bootstrap/` from [Bootstrap](http://getbootstrap.com/) is licensed
   under the MIT license.
 * Files in `bootstrap-select/` from [bootstrap-select]
   (https://github.com/silviomoreto/bootstrap-select) is licensed under the
   MIT license.
 * Files in `docson/` from [Docson](https://github.com/lbovet/docson) is
   licensed under the Apache License, Version 2.
 * Files in `JSONFormatter/` by [Redsandro and Vladimir Bodurov]
   (https://gist.github.com/Redsandro/5473335) is licensed under the MIT
   license.
 * `promise.js` is from [es6-promises by Jake Archibald]
   (https://github.com/jakearchibald/es6-promise) is licensed under the MIT
   license.
