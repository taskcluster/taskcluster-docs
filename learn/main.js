var util    = require('util');
var slugid  = require('slugid');
var ace     = require('brace');
require('brace/mode/javascript');
require('brace/theme/ambiance');
var babel   = require('babel-core/lib/babel/api/browser');

// Babel runtime part we use
require('babel-runtime/regenerator');
require('babel-runtime/core-js/promise');

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
    editor.setOption("maxLines", 50);
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
    var reset = makeButton('Reset', 'warning');
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