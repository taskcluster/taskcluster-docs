var through = require('through2');
var _ = require('lodash');
var gutil = require('gulp-util');
var File = require('vinyl');

/**
 * Generate a table of contents and nav links out of a directory structure full
 * of markdown files.
 */

module.exports = function(options) {
  var nodes = {children: []};

  return through.obj(function(file, enc, cb) {
    // insert this file into nodes, based on its relative filename
    var ptr = nodes;
    var path = [];
    var order = 1000;
    if (file.docsMetadata) {
      order = file.docsMetadata.menuIndex;
    }
    file.relative.split('/').forEach(function(name) {
      path.push(name);
      var child = _.find(ptr.children, ['name', name]);
      if (!child) {
        child = {
          name: name,
          path: path.join('/'),
          children: [],
          order: order,
        };
        ptr.children.push(child);
      }
      ptr = child;
    });
    ptr.file = file;
    if (file.data.order) {
      ptr.order = file.data.order;
    }

    cb(); // don't push the file yet; all files will be pushed at the end
  }, function(cb) {
    gutil.log("generating table of contents for " + options.rootPath);

    // strip the top layer of the table of contents
    nodes = nodes.children[0];

    // Traverse the nodes in order (by node.order), setting `up`, `next`, and
    // `prev` links.
    var prevNode = null;
    var addNav = function(node, parentNode) {
      node.children = _.sortBy(node.children, function (c) { return c.order; });
      if (node.file) {
        if (parentNode) {
          node.up = '/' + parentNode.path;
        }
        if (prevNode) {
          node.prev = '/' + prevNode.path;
          prevNode.next = '/' + node.path;
        }
        prevNode = node;
        parentNode = node;
      }
      _.forEach(node.children, function(child) { addNav(child, parentNode); });
    };
    addNav(nodes, null);

    // Generate a table of contents that is easily consumed by the Pug template
    var makeToc = function(node) {
      return {
        title: node.file? (node.file.data.title || node.name) : node.name,
        path: '/' + node.path,
        link: !!node.file,
        children: _.map(node.children, makeToc),
      }
    };
    var toc = makeToc(nodes).children;

    // generate the sequence of Vinyl files, including redirects to the root for
    // nodes with no content
    var self = this;
    var pushNode = function(node) {
      if (!node.file) {
        node.file = new File({
          base: process.cwd(),
          path: node.path,
          contents: new Buffer("This page intentionally left blank."),
        });
        node.file.data = {
          headers: {'website-redirect-location': options.rootPath},
        };
      } else {
        node.file.data.nav = {
          top: node.top,
          up: node.up,
          next: node.next,
          prev: node.prev,
          toc: toc,
        };
      }
      self.push(node.file);
      _.forEach(node.children, pushNode);
    };
    pushNode(nodes);
    cb();
  });
}
