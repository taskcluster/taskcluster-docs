/**
 * Although git-blame tells you this was written by bstack,
 * it was really written by github.com/kristelteng. All credit
 * for good parts go to her and all blame for bad parts go to
 * bstack.
 *
 * Format of the raw docs is available at:
 * https://github.com/taskcluster/taskcluster-lib-docs/blob/master/docs/format.md
 */
var path = require('path');
var _ = require('lodash');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = require('vinyl');
var fs = require('fs');
var pug = require('pug');
var marked = require('marked');

/**
 * Runs for each tarball. It:
 * 1. generates html from json for references and schemas
 * 2. generates index pages from README.md's
 * 3. sets the appropriate paths for files, with tier information etc
 */
module.exports = function() {
  // collect info for this particular project
  // as the data stream is parsed
  var projects = {};

  // We moved this to pug because the ejs we use client-side
  // isn't actually the normal ejs and it is annoying so I figured if
  // I was going to port this to something else, may as well use what
  // we use elsewhere.
  var refTemplate = pug.compileFile('layout/reference.pug');

  return through.obj(function each(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (path.basename(file.relative) === 'metadata.json') {
      return cb();
    }
    if (path.basename(file.relative) === 'README.md') {
      file.path = file.path.slice(0, -9)
    }

    // There's a bunch of splitting and joining going on from here on out.
    // It's a bit complicated looking so to get a better understanding,
    // you can check out the docs of what one of these docs tarballs
    // looks like at  https://github.com/taskcluster/taskcluster-lib-docs/blob/master/docs/format.md
    var project = file.relative.split('/')[1];
    var type = file.relative.split('/')[2];
    var spl = file.path.split(project);
    // To guard for the project name existing in document names
    var p = _.concat(spl[0], _.join(spl.slice(1), project));
    var metadata = projects[project];

    if (!metadata) {
      metadata = JSON.parse(fs.readFileSync(p[0] + '/' + project + '/metadata.json'));
      projects[project] = metadata;
    }
    file.path = _.join([p[0], metadata.tier + '/' + project, p[1]], '');
    file.docsMetadata = metadata;
    file.data = {};

    if (type === 'references') {
      var dat = JSON.parse(file.contents);
      dat.marked = marked;
      file.contents = new Buffer(refTemplate(dat));
      file.data.docson = true;
    }

    this.push(file);
    return cb();
  });
}
