const gutil = require('gulp-util');
const through = require('through2');
const {URL, resolve} = require('url');
const {JSDOM} = require('jsdom');

const rewriteElement = (baseUrl, elt, attrName) => {
  const attr = elt.getAttribute(attrName);
  if (attr) {
    const resolved = new URL(resolve(baseUrl, attr));

    if (resolved.hostname === 'docs.taskcluster.net') {
      resolved.hostname = 'r.taskcluster.net';
    }

    if (resolved.pathname && !resolved.pathname.startsWith('/docs/')) {
      resolved.pathname = '/docs' + resolved.pathname;
    }
    if (resolved.href != attr) {
      elt.setAttribute(attrName, resolved.href);
    }
  }
};

/**
 * Rewrite `.html` files to contain only absolute URLs, for ease of later
 * rewriting for a specific rootUrl.  This rewrites URLs to be relative to
 * https://r.taskcluster.net/ and additionally adds a `/docs/` prefix for
 * anything missing that prefix.
 *
 * These URLs will be rewritten on deployment to change `r.taskcluster.net`
 * to the hostname of the deployment's rootUrl. URLs are made absolute to
 * make that rewrite easier (done with a regex instead of an HTML parser).
 *
 * Eventually, all documentation should use either absolute `r.taskcluster.net`
 * URLs or, where possible, relative URLs.
 */
exports.rewriteAbsoluteUrls = function() {
  return through.obj(function(file, enc, cb) {
    try {
      if (!file.relative.endsWith('.html') || file.stat.isDirectory()) {
        return cb(null, file);
      }

      const baseUrl = file.relative.replace(/^app\//, 'https://r.taskcluster.net/docs/');
      const dom = new JSDOM(file.contents, {url: baseUrl});
      const document = dom.window.document;

      // rewrite all a and img elements to have an absolute href/src
			for (let elt of document.getElementsByTagName('a')) {
        rewriteElement(baseUrl, elt, 'href');
      }
			for (let elt of document.getElementsByTagName('img')) {
        rewriteElement(baseUrl, elt, 'src');
      }

      file.contents = new Buffer(dom.serialize());
    } catch (err) {
      // streams don't really do error handling, so just bail out..
      console.error(err);
      process.exit(1);
    }
    cb(null, file);
  }, function(cb) {
    cb();
  });
}
