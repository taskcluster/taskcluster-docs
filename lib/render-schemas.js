const path = require('path');
const fs = require('fs');
const got = require('got');
const pug = require('pug');
const {buildSchemaId} = require('./utils');
const {URL} = require('url');
const {JSDOM} = require('jsdom');
const through = require('through2');
const PluginError = require('plugin-error');
const marked = require('marked');
const RefParser = require('json-schema-ref-parser');

marked.setOptions({gfm: true});

const template = pug.compile('include schema.pug\n+schemabox(schema)', {
  filename: 'layout/markedschema.pug',
});

module.exports = () => through.obj((file, enc, cb) => {
  if (file.isNull()) {
    cb(null, file);
    return;
  };
  if (file.isStream()) {
    cb(new PluginError('render-schemas', 'Streaming not supported'));
    return;
  }

  let promises = [];
  const dom = JSDOM.fragment(file.contents);
  const schemas = dom.querySelectorAll('div[data-render-schema]');
  schemas.forEach(div => {
    let schemaRef = div.dataset.renderSchema;
    if (schemaRef) {
      promises.push((async () => {
        let schema;

        schemaRef = buildSchemaId(schemaRef);

        try {
          const url = new URL(schemaRef);
          schema = (await got(url)).body;
        } catch (err) {
          if (!(err instanceof TypeError)) {
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

        schema = await RefParser.dereference(schemaRef, JSON.parse(schema), {dereference: {circular: 'ignore'}});
        schema.id = schema.id || schemaRef;
        schema.$id = schema.$id || schemaRef;
        div.innerHTML = template({schema, marked});
      })());
    }
  });
  Promise.all(promises).then(() => {
    let result = '';
    for (let child of dom.children) {
      result += child.outerHTML;
    }
    file.contents = new Buffer(result);
    cb(null, file);
  }).catch(err => {
    cb(err);
  });
});
