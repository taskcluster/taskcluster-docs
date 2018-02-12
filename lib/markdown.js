const path = require('path');
const fs = require('fs');
const { URL } = require('url');
const pug = require('pug');
const request = require('sync-request'); // Need this because marked renderer is not async
const {JSDOM} = require('jsdom');
const through = require('through2');
const marked = require('marked');
const PluginError = require('plugin-error');

marked.setOptions({gfm: true});

const template = pug.compile('include schema.pug\n+schemabox(schema)', {
  filename: 'layout/markedschema.pug',
});

// This is inspired heavily by gulp-markdown
// We use this version rather than that one because we need access to the
// path of the file we're rendering so as to grab assets that are local to the
// doc. This is the part with schemaPath below
//
// This will take a given markdown file and render it to markdown using marked
// except for elements that have a 'data-render-schema` property. They will be
// passed through our pug-based schema rendering system and then merged back in.
module.exports = () => through.obj((file, enc, cb) => {
  if (file.isNull()) {
    cb(null, file);
    return;
  };
  if (file.isStream()) {
    cb(new PluginError('gulp-markdown', 'Streaming not supported'));
    return;
  }

  const renderer = new marked.Renderer();
  renderer.html = content => {
    const dom = JSDOM.fragment(content);
    const schemaRef = dom.children[0] && dom.children[0].dataset.renderSchema;
    if (!schemaRef) {
      return content;
    }

    let schema;

    try {
      const url = new URL(schemaRef);
      schema = request('GET', schemaRef).getBody();
    } catch (err) {
      if (!err instanceof TypeError) {
        throw err;
      }
    }

    if (!schema) {
      const baseDir = path.dirname(file.origPath || file.path);
      const schemaPath = path.join(baseDir, schemaRef);
      if (!schemaPath.startsWith(baseDir)) {
        throw new Error('Invalid schema reference');
      }
      schema = fs.readFileSync(schemaPath);
    }

    schema = JSON.parse(schema);
    return template({schema, marked});
  };

  marked(file.contents.toString(), {renderer}, (err, data) => {
    if (err) {
      cb(new PluginError('gulp-markdown', err, {fileName: file.path}));
      return;
    }
    file.contents = Buffer.from(data);
    file.extname = '.html';
    file.path = file.path.replace(/\.md$/, '.html');
    cb(null, file);
  });
});
