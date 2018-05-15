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
var url = require('url');
var path = require('path');
var RefParser = require('json-schema-ref-parser');

/**
 * Runs for each tarball. It:
 * 1. generates index pages from README.md's
 * 2. sets the appropriate paths for files, with tier information etc
 * 3. renders references
 */
module.exports = function() {
  // fetch and cache the project metadata
  const _projectMetadata = {};
  const projectMetadata = (project) => {
    let metadata = _projectMetadata[project];
    if (!metadata) {
      const pathname = path.join('raw/reference', project, 'metadata.json');
      metadata = JSON.parse(fs.readFileSync(pathname));
      _projectMetadata[project] = metadata;
    }
    return metadata;
  };

  marked.setOptions({gfm: true})

  // We moved this to pug because the ejs we use client-side
  // isn't actually the normal ejs and it is annoying so I figured if
  // I was going to port this to something else, may as well use what
  // we use elsewhere.
  var refTemplate = pug.compileFile('layout/reference.pug');

  const handleFile = async file => {
    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME, 'Streams are not supported!');
    }

    // drop metadata files (we parse them directly)
    if (path.basename(file.relative) === 'metadata.json') {
      return;
    }

    // break up the pathname into its parts
    let [match, project, docPath] = file.relative.match(/reference\/([^\/]*)\/(.*)/);
    const metadata = projectMetadata(project);

    // special handling for various docsPaths.
    if (docPath === 'README.md') {
      docPath = 'index.md';
    } else if (docPath.startsWith('references/')) {
      var dat = JSON.parse(file.contents);
      dat.marked = marked;

      // TODO: Get this all cleaned up
      await Promise.all(_.flatMap(dat.entries, ref => {
        return _.map(['input', 'output', 'schema'], type => {
          if (ref[type]) {
            let sname = path.basename(url.parse(ref[type]).pathname);
            // This JSON.parse stuff here and a few lines down lets us avoid going remote for remote refs
            // that are actually local. We do not allow remote (as in cross-project) refs in taskcluster.
            let schema = JSON.parse(fs.readFileSync(path.join('raw/reference', project, 'schemas', sname)));
            return RefParser.dereference(schema, {
              resolve: {
                any: {
                  order: 1,
                  canRead: /^http*/,
                  read: (file, callback) => {
                    let sname = path.basename(url.parse(file.url).pathname);
                    callback(null, JSON.parse(fs.readFileSync(path.join('raw/reference', project, 'schemas', sname))));
                  },
                },
              },
              dereference: {
                circular: 'ignore',
              },
            }).then(s => {
              ref[type] = s;
            });
          }
          return Promise.resolve();
        });
      }));

      file.contents = new Buffer(refTemplate(dat));
      file.inline = true;
    }

    // convert to ./ - based file.  This full path stuff is madness.
    file.origPath = file.path; // used by render-schemas
    file.docsMetadata = metadata;
    file.cwd = '.';
    file.base = '.'
    file.path = `reference/${metadata.tier}/${project}/${docPath}`;
    file.data = {};

    return file;
  };

  return through.obj(function each(file, enc, cb) {
    handleFile(file).then(file => {
      if (file) {
        this.push(file);
      }
      cb();
    }).catch(err => {
      cb(err);
    });
  });
}
