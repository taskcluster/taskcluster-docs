var {downloader} = require('taskcluster-lib-docs');
var path = require('path');
var _ = require('lodash');
var through = require('through2');
var VFile = require('vinyl');

// readme pattern to match: [projectName/readme.md]
var readmePattern = /[A-Za-z0-9-_]+\/readme\.md/i;

var credentials = {
  clientId:     process.env.TASKCLUSTER_CLIENT_ID,
  accessToken:  process.env.TASKCLUSTER_ACCESS_TOKEN,
};

let getTarball = async (project) => {
  // downloads a project's tarball
  // given credentials from the environment
  let data = await downloader({
    credentials,
    project,
  });
  return data;
};

/**
 * Runs for each tarball. It:
 * 1. generates html from json for references and schemas
 * 2. generates index pages from README.md's
 * 3. sets the appropriate paths for files, with tier information etc
 */
function transformDocs() {
  // collect info for this particular project
  // as the data stream is parsed
  let projectInfo = {
    data: {},
    cwd: null,
    base: null,
    name: null,
    menuIndex: null,
  };

  return through.obj(function each(file, enc, cb) {
    let fname = path.basename(file.path);

    if (fname === 'metadata.json') {
      let metadata = JSON.parse(file._contents.toString());
      projectInfo.tier = metadata.tier;
      projectInfo.menuIndex = metadata.menuIndex || 10;
      cb();
      return;
    }

    // get each file in the stream
    let [projectName, kind, filename] = file.path.split('/');

    if (file.path.match(readmePattern)) {
      // rename README.md to project index
      projectInfo.data[`markdown/readme/${projectName}/index.md`] = file._contents;
      cb()
      return;
    }

    if (projectInfo.cwd === null) {
      projectInfo.cwd = file.cwd;
    }

    if (projectInfo.base === null) {
      projectInfo.base = file.base;
    }

    if (projectInfo.name === null) {
      projectInfo.name = projectName;
    }

    if (kind === "references") {

      let basename = path.basename(file.path, '.json');
      let dataJSON = file._contents.toString();
      let fileHTML = `<div class="api-reference"><script>referenceData=${dataJSON}</script></div>`;
      projectInfo.data[`html/reference/${projectName}/${basename}.html`] = new Buffer(fileHTML, 'utf8');

    } else if (kind === "schema") {

      // for schemas, return the JSON and later create an html loader
      // because docson is an external library and only generates markup on xhr
      projectInfo.data[`json/schema/${projectName}/${fname}`] = file._contents;

    } else if (kind === "docs") {

      projectInfo.data[`markdown/docs/${projectName}/${fname}`] = file._contents;
    }

    cb();
  }, function done(cb) {

    let projectDesc = {
      projectName: projectInfo.name,
      files: [],
      menuIndex: projectInfo.menuIndex
    };

    _.forOwn(projectInfo.data, (contents, key) => {
      let [fileType, kind, projectName, filename] = key.split('/');

      let filePath = `reference/${projectInfo.tier}/${projectName}/${kind}/${filename}`;

      if (fileType === "markdown" && kind === "readme") {
        // skip the kind for the markdown readme, so it is the project's index page
        filePath = `reference/${projectInfo.tier}/${projectName}/${filename}`;
      }

      let vfile = new VFile({
        cwd: projectInfo.cwd,
        base: projectInfo.base,
        path: filePath,
        contents,
      });

      // properties for pug instead of front-matter
      if (fileType == "html") {
        vfile.data = {
            docson: true,
            ejs: true,
            docref: true,
            marked: true,
            superagent: true
        };
      }
      this.push(vfile);

      if (fileType === "json" && kind === "schema") {
        // need to create html for schemas/docson here because the tier
        // is not available before. The URL for the JSON needs to be generated
        // in the docson reference in the HTML

        let htmlContent= `<div data-render-schema='/${filePath}'></div>`;
        // turn "foo/bar/baz.json" into "foo/bar/baz.html"
        let htmlFilePath = filePath.slice(0, (filePath.length - 5)) + '.html';
        projectDesc.files.push(htmlFilePath);

        let htmlvfile = new VFile({
          cwd: projectInfo.cwd,
          base: projectInfo.base,
          path: htmlFilePath,
          contents: new Buffer(htmlContent, 'utf8'),
        });
        htmlvfile.data = {
          docson: true,
          ejs: true,
          docref: true,
          marked: true,
          superagent: true
        };
        this.push(htmlvfile);
      }
    });

    cb();
  });
}

module.exports = {getTarball, transformDocs};