var util    = require('util');
var slugid  = require('slugid');
var ace     = require('brace');
require('brace/mode/javascript');
require('brace/theme/ambiance');
var babel   = require('babel-core');

// Babel runtime regenerator
require('babel-runtime/regenerator');

// babel-runtime core-js
require('babel-runtime/core-js/symbol/unscopables');
require('babel-runtime/core-js/symbol/for');
require('babel-runtime/core-js/symbol/has-instance');
require('babel-runtime/core-js/symbol/is-concat-spreadable');
require('babel-runtime/core-js/symbol/split');
require('babel-runtime/core-js/symbol/match');
require('babel-runtime/core-js/symbol/replace');
require('babel-runtime/core-js/symbol/species');
require('babel-runtime/core-js/symbol/search');
require('babel-runtime/core-js/symbol/key-for');
require('babel-runtime/core-js/symbol/iterator');
require('babel-runtime/core-js/symbol/to-primitive');
require('babel-runtime/core-js/symbol/to-string-tag');
require('babel-runtime/core-js/weak-map');
require('babel-runtime/core-js/math/log10');
require('babel-runtime/core-js/math/atanh');
require('babel-runtime/core-js/math/imul');
require('babel-runtime/core-js/math/log2');
//require('babel-runtime/core-js/math/pot');
require('babel-runtime/core-js/math/hypot');
require('babel-runtime/core-js/math/expm1');
require('babel-runtime/core-js/math/sign');
require('babel-runtime/core-js/math/cosh');
require('babel-runtime/core-js/math/sinh');
require('babel-runtime/core-js/math/fround');
require('babel-runtime/core-js/math/trunc');
require('babel-runtime/core-js/math/clz32');
require('babel-runtime/core-js/math/acosh');
require('babel-runtime/core-js/math/log1p');
require('babel-runtime/core-js/math/cbrt');
require('babel-runtime/core-js/math/tanh');
require('babel-runtime/core-js/math/asinh');
require('babel-runtime/core-js/string/at');
require('babel-runtime/core-js/string/unescape-html');
require('babel-runtime/core-js/string/starts-with');
require('babel-runtime/core-js/string/ends-with');
require('babel-runtime/core-js/string/raw');
require('babel-runtime/core-js/string/code-point-at');
require('babel-runtime/core-js/string/from-code-point');
require('babel-runtime/core-js/string/repeat');
require('babel-runtime/core-js/string/includes');
require('babel-runtime/core-js/string/escape-html');
require('babel-runtime/core-js/number/is-safe-integer');
require('babel-runtime/core-js/number/epsilon');
require('babel-runtime/core-js/number/is-nan');
require('babel-runtime/core-js/number/max-safe-integer');
require('babel-runtime/core-js/number/is-integer');
require('babel-runtime/core-js/number/parse-int');
require('babel-runtime/core-js/number/min-safe-integer');
require('babel-runtime/core-js/number/parse-float');
require('babel-runtime/core-js/number/is-finite');
//require('babel-runtime/core-js/number/random');
require('babel-runtime/core-js/is-iterable');
//require('babel-runtime/core-js/date/add-locale');
//require('babel-runtime/core-js/date/format');
//require('babel-runtime/core-js/date/format-utc');
require('babel-runtime/core-js/set');
require('babel-runtime/core-js/regexp/escape');
require('babel-runtime/core-js/promise');
require('babel-runtime/core-js/reflect/get-own-property-descriptor');
require('babel-runtime/core-js/reflect/is-extensible');
require('babel-runtime/core-js/reflect/prevent-extensions');
require('babel-runtime/core-js/reflect/own-keys');
require('babel-runtime/core-js/reflect/has');
require('babel-runtime/core-js/reflect/get');
require('babel-runtime/core-js/reflect/set');
require('babel-runtime/core-js/reflect/define-property');
require('babel-runtime/core-js/reflect/set-prototype-of');
require('babel-runtime/core-js/reflect/apply');
require('babel-runtime/core-js/reflect/get-prototype-of');
require('babel-runtime/core-js/reflect/enumerate');
require('babel-runtime/core-js/reflect/construct');
require('babel-runtime/core-js/reflect/delete-property');
//require('babel-runtime/core-js/function/only');
require('babel-runtime/core-js/function/part');
require('babel-runtime/core-js/get-iterator');
require('babel-runtime/core-js/symbol');
require('babel-runtime/core-js/object/get-own-property-descriptor');
require('babel-runtime/core-js/object/is-extensible');
require('babel-runtime/core-js/object/prevent-extensions');
require('babel-runtime/core-js/object/seal');
require('babel-runtime/core-js/object/is-sealed');
require('babel-runtime/core-js/object/define');
require('babel-runtime/core-js/object/get-own-property-names');
require('babel-runtime/core-js/object/classof');
require('babel-runtime/core-js/object/keys');
require('babel-runtime/core-js/object/is-object');
require('babel-runtime/core-js/object/define-property');
require('babel-runtime/core-js/object/freeze');
require('babel-runtime/core-js/object/set-prototype-of');
require('babel-runtime/core-js/object/create');
require('babel-runtime/core-js/object/values');
require('babel-runtime/core-js/object/is');
require('babel-runtime/core-js/object/make');
require('babel-runtime/core-js/object/get-prototype-of');
require('babel-runtime/core-js/object/assign');
require('babel-runtime/core-js/object/entries');
require('babel-runtime/core-js/object/get-own-property-symbols');
require('babel-runtime/core-js/object/define-properties');
require('babel-runtime/core-js/object/get-own-property-descriptors');
require('babel-runtime/core-js/object/is-frozen');
require('babel-runtime/core-js/object/index');
require('babel-runtime/core-js/map');
require('babel-runtime/core-js/array/slice');
require('babel-runtime/core-js/array/concat');
require('babel-runtime/core-js/array/of');
require('babel-runtime/core-js/array/push');
require('babel-runtime/core-js/array/some');
require('babel-runtime/core-js/array/splice');
require('babel-runtime/core-js/array/filter');
require('babel-runtime/core-js/array/from');
require('babel-runtime/core-js/array/sort');
require('babel-runtime/core-js/array/keys');
require('babel-runtime/core-js/array/reverse');
require('babel-runtime/core-js/array/fill');
require('babel-runtime/core-js/array/values');
require('babel-runtime/core-js/array/reduce');
require('babel-runtime/core-js/array/last-index-of');
//require('babel-runtime/core-js/array/turn');
require('babel-runtime/core-js/array/pop');
require('babel-runtime/core-js/array/copy-within');
require('babel-runtime/core-js/array/for-each');
require('babel-runtime/core-js/array/entries');
require('babel-runtime/core-js/array/reduce-right');
require('babel-runtime/core-js/array/shift');
require('babel-runtime/core-js/array/unshift');
require('babel-runtime/core-js/array/index-of');
require('babel-runtime/core-js/array/every');
require('babel-runtime/core-js/array/find-index');
require('babel-runtime/core-js/array/find');
require('babel-runtime/core-js/array/join');
require('babel-runtime/core-js/array/map');
require('babel-runtime/core-js/array/includes');
require('babel-runtime/core-js/weak-set');

// babel-runtime helpers
require('babel-runtime/helpers/slice');
require('babel-runtime/helpers/create-decorated-class');
require('babel-runtime/helpers/inherits');
require('babel-runtime/helpers/temporal-assert-defined');
require('babel-runtime/helpers/extends');
require('babel-runtime/helpers/has-own');
require('babel-runtime/helpers/self-global');
require('babel-runtime/helpers/interop-require');
require('babel-runtime/helpers/instanceof');
require('babel-runtime/helpers/create-decorated-object');
require('babel-runtime/helpers/default-props');
require('babel-runtime/helpers/temporal-undefined');
require('babel-runtime/helpers/interop-require-wildcard');
require('babel-runtime/helpers/tagged-template-literal');
require('babel-runtime/helpers/new-arrow-check');
require('babel-runtime/helpers/get');
require('babel-runtime/helpers/set');
require('babel-runtime/helpers/create-class');
require('babel-runtime/helpers/define-property');
require('babel-runtime/helpers/to-consumable-array');
require('babel-runtime/helpers/defaults');
require('babel-runtime/helpers/typeof');
require('babel-runtime/helpers/tagged-template-literal-loose');
require('babel-runtime/helpers/object-destructuring-empty');
require('babel-runtime/helpers/sliced-to-array-loose');
require('babel-runtime/helpers/define-decorated-property-descriptor');
require('babel-runtime/helpers/object-without-properties');
require('babel-runtime/helpers/interop-require-default');
require('babel-runtime/helpers/sliced-to-array');
require('babel-runtime/helpers/interop-export-wildcard');
require('babel-runtime/helpers/async-to-generator');
require('babel-runtime/helpers/bind');
require('babel-runtime/helpers/to-array');
require('babel-runtime/helpers/class-call-check');

// Built-in modules for use in examples
require('assert');
require('buffer');
require('console');
require('constants');
require('crypto');
require('domain');
require('events');
require('http');
require('https');
require('os');
require('path');
require('punycode');
require('querystring');
require('stream');
require('string_decoder');
require('timers');
require('tty');
require('url');
require('util');
require('vm');
require('zlib');

// Modules for use in code examples
require('taskcluster-client');
require("slugid");
require("lodash");
require("uuid");
require("superagent");
require("superagent-promise");
require("debug");
require("hawk");
require("promise");
require("url-join");
require("bluebird");
require("aws-sdk");
require("aws-sdk-promise");
require("js-yaml");
require("xml2js");

var makeButton = function(text, type) {
  var btn = document.createElement("a");
  btn.innerHTML = text;
  btn.classList.add("btn");
  btn.classList.add("btn-" + type);
  btn.style.marginRight = '5px';
  return btn;
};

var cleanEval = function(window, require, console) {
  var global = window;
  var Buffer = require('buffer').Buffer;
  return eval(arguments[3]);
};

var evalCount = 0;
document.addEventListener("DOMContentLoaded", function() {
  var selector = 'pre[data-plugin=interactive-example]';
  var nodeList = document.querySelectorAll(selector);
  var preList  = Array.prototype.slice.call(nodeList);

  preList.forEach(function(pre) {
    var initialCode = pre.textContent.replace(/\n$/, '');
    pre.style.border = 'none';
    pre.style.borderRadius = '0px';
    var editor = ace.edit(pre);
    editor.$blockScrolling = Infinity;
    editor.setTheme('ace/theme/ambiance');
    editor.setValue(initialCode, 1);
    editor.setAutoScrollEditorIntoView(true);
    editor.setOption("maxLines", 80);
    editor.setOption("showFoldWidgets", false);
    editor.setHighlightActiveLine(false);
    editor.setHighlightGutterLine(false);
    editor.setShowPrintMargin(false);
    editor.getSession().setMode('ace/mode/javascript');
    editor.getSession().setUseSoftTabs(true);
    editor.getSession().setTabSize(2);
    editor.getSession().setUseWorker(false);

    // Create output
    var output = document.createElement("pre");
    output.style.display = 'none';

    var capturingConsole = Object.create(console);
    var writeOutput = function() {
      var args = Array.prototype.slice.call(arguments);
      Function.prototype.apply.call(console.log, console, args);
      var data = args.map(function(arg) {
        if (typeof arg === 'string') {
          return arg;
        } else if (typeof arg === 'Function') {
          return arg.toString();
        }
        return util.inspect(arg);
      });
      output.style.display  = 'block';
      output.textContent   += data + '\n';
    };
    capturingConsole.log    = writeOutput;
    capturingConsole.info   = writeOutput;
    capturingConsole.warn   = writeOutput;
    capturingConsole.error  = writeOutput;
    capturingConsole.debug  = writeOutput;
    capturingConsole.clear  = function() {
      output.textContent    = "";
      output.style.display  = 'none';
    };

    // Create buttons
    var buttons = document.createElement("div");
    buttons.style.marginBottom = '10px';
    var run = makeButton('Run Code', 'primary');
    var reset = makeButton('Reset Editor', 'warning');
    buttons.appendChild(run);
    buttons.appendChild(reset);
    run.onclick = function() {
      capturingConsole.clear();
      var value = editor.getValue();
      try {
        var code = babel.transform([
          "(async function example() {",
          value,
          "})"
        ].join('\n'), {
          stage:      1,
          optional:   ['runtime'],
          filename:   'eval-' + (evalCount++) + '.js',
          sourceMaps: 'inline'
        }).code;
      } catch (err) {
        capturingConsole.log("Compilation Error: " + err.message);
        if (err.codeFrame) {
          capturingConsole.log(err.codeFrame);
        }
      }
      var f = cleanEval(window, require, capturingConsole, code);
      var displayError = function(err) {
        capturingConsole.log(err.stack);
        capturingConsole.log('details: ' + util.inspect(err));
      };
      setTimeout(function run() {
        try {
          f().catch(displayError);
        } catch (err) {
          displayError(err);
        }
      }, 0);
    };
    reset.onclick = function() {
      editor.setValue(initialCode, 1);
      capturingConsole.clear();
    };

    // Insert buttons and output after pre
    var parent = pre.parentNode;
    parent.insertBefore(buttons, pre.nextSibling);
    parent.insertBefore(output, buttons.nextSibling);
  });
});