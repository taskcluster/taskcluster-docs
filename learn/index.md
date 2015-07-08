---
layout:   default
class:    markdown
---

Interactive TaskCluster Tutorials
=================================

The goal of these interactive TaskCluster tutorials is to show you how to
script TaskCluster with modern asynchronous Javascript patterns. This page will
give a brief introduction to modern asynchronous Javascript patterns, the rest
of the tutorials are focused on how to use TaskCluster.

The first tutorial "Authentication" **must** be competed before you proceed to
the other tutorials, or the examples will not work. The first few tutorials aims
to give you a quick introduction and it's recommended that you complete them.
However, before you get started you should have a basic understanding of
promises and `async` functions, this page should provide the required
background, if not it's recommended you fine articles elsewhere.

Later tutorials will go more into depth focusing on how to combine
TaskCluster features and components to achieve high-level goals.
TaskCluster consists of many loosely coupled components, and while they all
have extensive reference-style documentation, it can be very hard to see how
all the pieces fit together.

To keep all of this exciting the tutorials are designed to run in your browser.
So the skills you learn here can be employed to scripting both servers and
static web-sites using TaskCluster APIs to display state, listen for events,
spawn tasks and many other things.

Note, the graphical TaskCluster tools on `tools.taskcluster.net` are all
written in client-side the Javascript, in fact the entire site is a static
web-site hosted on a CDN.


Modern `async` Javascript
-------------------------

All the Javascript examples in these tutorials are compiled with
[babeljs](https://babeljs.io/) using proposed ES7 features (stage 1).
This setup compiles ES6 and ES7 proposed features to ES5 before they are
evaluated, allowing us to use the same powerful of asynchronous features in both
the browser and node.js (neither of which implements `async` functions yet.

### Promises

A promise is an object that implements the
[Promise/A+ specification](https://promisesaplus.com/). This ensures a lot of
nice properties, you should read a tutorial on promises.
But for the purposes of this introduction you can think of a promise as an
object with a method`.then(resultCallback, errorCallback)`, such that either
`resultCallback(result)` or `errorCallback(error)` is called when the promise
is resolved (only one of callback is called, and only once).

<pre data-plugin="interactive-example">
// Construct a promise that is fulfilled after 500 ms
var aPromiseObject = new Promise(function(fulfill, reject) {
  // Note: the `new Promise()` constructor is only used when wrapping a function
  // that takes a callback rather then returning a promise. You'll rarely have
  // to use this, if the libraries you use a promise based.
  setTimeout(function() {
    fulfill("Hello World"); // A promise can only have a single result
  }, 500);
});

// Let's supply the promise object with two callbacks, one for success and
// one for errors.
aPromiseObject.then(function(result) {
  console.log("Promise was fulfilled, with result: " + result);
}, function(err) {
  console.log("Promise was rejected with error: " + err);
});
</pre>

Traditionally, Javascript developers have relied on callbacks when creating
asynchronous functions, however, modern asynchronous Javascript functions
returns a promise, instead of taking a callback as argument. This way you have
an object (a promise) representing an on-going asynchronous operation, allowing
for a variety of nifty combinations and avoids deeply-nested callbacks.

One of the nifty tricks is that you can give a list of promises to
`Promise.all()` which then returns a promise that is fulfilled when all the
promises in the list are fulfilled (and rejected if any promise is rejected).

<pre data-plugin="interactive-example">
// Function that returns a promise that is fulfilled after 500 ms
var myAsyncFunc = function() {
  console.log("myAsyncFunc was called!");
  return new Promise(function(fulfill) {
    setTimeout(function() {
      fulfill("Hello World");
    }, 500)
  });
};

// Call myAsyncFunc twice in parallel
var aPromiseObject = Promise.all([
  myAsyncFunc(),
  myAsyncFunc()
]);

// When the promise from Promise.all() is returns it is an array of results
// from the promises it was given
aPromiseObject.then(function(results) {
  console.log("Got results:");
  console.log(results);
});
</pre>

As seen the example when the promise from `Promise.all(promises)` is fulfilled,
it is fulfilled with an array of the results from `promises` as result. Using
`Promise.all()` is useful when doing things in parallel, and is particularly
useful in combination with `Array.map`.


### Chaining Promises

Another nifty trick with promises is that promises can be chained.
The result of the `.then` method is a new promise, this promise will be resolved
once the first promise is done _and_ any promise returned from the callback
handler is fulfilled. Additionally, if you don't supply an error handler, the
errors will just propagates down your promise chain.

<pre data-plugin="interactive-example">
var count = 1;
var myAsyncFunc = function() {
  console.log("myAsyncFunc called: " + count++);
  return new Promise(function(fulfill) {setTimeout(fulfill, 500)});
};

var p1 = myAsyncFunc();

var p2 = p1.then(function() {
  console.log("p1 is fulfilled");
  // HACK: Try to throw an error here and see how it skips the `fulfilled`
  // handler for p2 and p3, and propagates to the `rejected` handler for p3.
  //throw new Error("Test Error Flow");

  // Call async function again
  return myAsyncFunc();
});

var p3 = p2.then(function() {
  console.log("p2 is fulfilled");
  // Let's call async function a third time
  return myAsyncFunc();
});

p3.then(function() {
  console.log("Promise was fulfilled");
}, function(err) {
  console.log("Promise was rejected with error: " + err);
});
</pre>

You should play with this a bit, but don't be scared we're about introduce
abstractions that hides a lot of complexity.


### ES7 (Proposed) `async` Functions
The `async` function proposal for ES7, as implemented by babeljs, introduces
two new keywords: `async` and `await`. The `async` keyword is used to label a
function as asynchronous `async function() {...}`. Inside the function body of
an asynchronous function you may then use the `await aPromiseObject` to _block_
execution of the function pending resolution of a promise.

If we take the chained promise example from before and implement the chain
using an `async` function as in the example below, we observe that promises are
a lot less scary.

<pre data-plugin="interactive-example">
var count = 1;
var myAsyncFunc = function() {
  console.log("myAsyncFunc called: " + count++);
  return new Promise(function(fulfill) {setTimeout(fulfill, 500)});
};

// Asynchronous function implementing promise chain from previous example
var myNewAsyncFunc = async function() {
  await myAsyncFunc();
  console.log("First call to myAsyncFunc fulfilled (p1 in chain-example)");

  // HACK: Try to throw an error here and see how it skips the rest of the
  // function because we don't catch the exception.
  //throw new Error("Test Error Flow");

  // Call async function again
  await myAsyncFunc();
  console.log("Second call to myAsyncFunc fulfilled (p2 in chain-example)");

  // Let's call async function a third time
  await myAsyncFunc();
};

// Calling the async function returns a promise
var aPromiseObject = myNewAsyncFunc();

// We can handle the promise as before (or await it in another async function)
aPromiseObject.then(function() {
  console.log("Promise was fulfilled");
}, function(err) {
  console.log("Promise was rejected with error: " + err);
});
</pre>

Now, the attentive reader is wondering what happens if the promise given to
`await` isn't fulfilled, but rejected with an error. In this case the `await`
expression will throw an exception that you can catch with a try/catch statement
as illustrated in the following example.

<pre data-plugin="interactive-example">
var count = 1;
var myAsyncFuncThatFails = function() {
  console.log("myAsyncFunc called: " + count++);
  return new Promise(function(fulfill, reject) {
    setTimeout(function() {
      // HACK: Try to fulfill the promise instead
      //fulfill("My result");

      // Notice we call reject, so the promise is rejected
      reject(new Error("MyTestError"));
    }, 500);
  });
};

var myAsyncFuncThatCatchesError = async function() {
  try {
    var result = await myAsyncFuncThatFails();
    console.log("myAsyncFunc was fulfilled, with result: " + result);
  } catch (err) {
    console.log("myAsyncFunc was rejected, with error: " + err);
  }
  console.log("myAsyncFuncThatCatchesError is done");
};

myAsyncFuncThatCatchesError();
</pre>

If you play with example above you'll see that if the promise given to `await`
is fulfilled with a result value, that value will be returned from the `await`
expression. Try commenting in `fulfill("My result");` below the `// HACK: ...`
comment.

As mentioned before you'll rarely have to use the `new Promise` constructor, if
the libraries you employ returns promises from their asynchronous functions.
As you'll see now this the case for the `taskcluster-client` module. Which we
use the example below to repeatedly ping `queue.taskcluster.net`.

<pre data-plugin="interactive-example">
// Load taskcluster-client module
var taskcluster = require('taskcluster-client');

// Create a queue client object
var queue = new taskcluster.Queue();

// Ping the queue repeatedly
var pingRepeatedly = async function(count) {
  while(count-- > 0) {
    var result = await queue.ping(); // Ping is just a check-if-alive API call
    console.log("Ping'ed queue and got response: " + JSON.stringify(result));
  }
};

// Create async function and call it immediately, so we don't have to use .then
(async function() {
  try {
    await pingRepeatedly(5);
  } catch (err) {
    console.log("Failed to ping queue: " + err);
  }
})();
</pre>

The alert reader will wonder how to implement `pingRepeatedly` using a
promise-chain, the answer is callback recursion, while it certainly is possible,
it gets very complicated very quickly. Using `async` and `await` syntax is much
simpler and easier to read. For completeness it should be noted that
babeljs compiles `async` functions to state machines instead of promise
chains. If you're curious about what babeljs constructs compile to give their
[try it out](https://babeljs.io/repl/) editor a spin.


### Other ES6 Features

As previously mentioned babeljs compiles all ES6 features to ES5 and some of
these features very nifty. For a completely look at the features review the
[babeljs introduction](https://babeljs.io/docs/learn-es2015/). This section will
give a quick overview of the ES6 features we've found useful.

First up is arrow functions, which is a short hand for writing functions and
preserving the `this` reference. These very useful for writing event handlers,
as illustrated in the example below.

<pre data-plugin="interactive-example">
var events = require('events');
var emitter = new events.EventEmitter();

// Using old school functions
emitter.on('my-event', function(arg1, arg2) {
  console.log("function handler, arg1: " + arg1);
}.bind(this)); // We should .bind(this), if the function used this

// Using arrow function
emitter.on('my-event', (arg1, arg2) => {
  console.log("arrow handler 1, arg1: " + arg1);
});

// If we only take one argument we don't need parenthesis () and, if the body
// is single statement, brackets {} aren't needed
emitter.on('my-event', arg1 => console.log("arrow handler 2, arg1: " + arg1));

// We still need paranthesis if no arguments is taken
emitter.on('my-event', () => console.log("arrow handler 3"));

// Emit an event from the event emitter
emitter.emit('my-event', 'val1');
</pre>

Generally, you'll want to use the arrow functions whenever you would normally
make anonymous functions. As an added bonus babeljs will let is make `async`
arrow functions, example: `async () => { await aPromiseObject; }`.

Another nifty ES6 feature is destructuring also known as unpacking, this is a
well-known and commonly used feature from Python. It allows you to easily unpack
elements from an object or a list, as illustrated in the example below.

<pre data-plugin="interactive-example">
// Create an object
var myObj = {
  key1: "key-1",
  key2: "key-2"
};

// Unpack the object
var {key1, key2} = myObj;
console.log("key1: " + key1);
console.log("key2: " + key2);

// Create a list
var list = ["A", "B", "C"];

// Unpack the list
var [element1, element2] = list;
console.log("element1: " + element1);
console.log("element2: " + element2);
</pre>

This guide won't go into further details with ES6 features, but if you haven't
had a look at ES6 classes, template strings, `let`/`const`, iterators and
`for`-`of` constructions it's certainly a recommended read.
Again babeljs has a good
[introduction to ES6 features](https://babeljs.io/docs/learn-es2015/).


Tutorial Runtime Environment
----------------------------

The code in the runnable examples on this page and through-out the tutorials
here, is compiled with babeljs prior to being executed. Additionally, it is
wrapped in `async function() { /* EXAMPLE CODE*/ }().catch(err => ...)`. This
allows you to use `await` without wrapping in an `async` function and ensures
that exceptions are caught and logged to console. All in all it makes it
possible to write code as follows.

<pre data-plugin="interactive-example">
// Load taskcluster-client module
var taskcluster = require('taskcluster-client');

// Create a queue client object
var queue = new taskcluster.Queue();

// Ping queue
var result = await queue.ping();

console.log("Ping'ed queue and got response: " + JSON.stringify(result));
</pre>

In node.js with babeljs you can't use `await` in the top-level function, but
you can just create an `async` main function that is invoked immediately. In
these example code environments we wrap in an `async` main function for you to
simplify the examples.

As the attentive reader might also have noticed, the example environment on
these pages also defines a `console` variable that captures output and writes
it below the editor when you press "Run Code". Finally, the environment also
defines variables `Buffer` and `require`, such that examples can import
modules bundled with browserify.

We have embedded the following **standard node modules** from browserify:
`assert`, `buffer`, `console`, `constants`, `crypto`, `domain`, `events`,
`http`, `https`, `os`, `path`, `punycode`, `querystring`, `stream`,
`string_decoder`, `timers`, `tty`, `url`, `util`, `vm`, `zlib`.

And the following **modules from npm**:
`taskcluster-client`, `slugid`, `lodash`, `uuid`, `superagent`,
`superagent-promise`, `debug`, `hawk`, `promise`, `url-join`, `bluebird`,
`aws-sdk`, `aws-sdk-promise`, `js-yaml`, `xml2js`.

Feel free to request additional modules to be added, or versions to be upgraded.
The intend is to supply modules that are useful in tutorials and for quick
one-off experiments.

<script src="bundle.js"></script>

