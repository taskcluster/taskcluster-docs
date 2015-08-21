---
layout:       default
class:        markdown
docson:       true
interactive:  true
---

The Interactive Feature
===================

This tutorial will show you how to create a task, and use the interactive
feature to SSH into the task's container or otherwise modify and extract 
information from the container. 

We must first create a task. If you don't know how to do this yet, you can 
first read the [create task](/learn/create-task) tutorial. We're going to 
add `features: {interactive: true}` to the `payload` to enable
interactive sessions on this task. 

<pre data-plugin="interactive-example">
let taskcluster = require('taskcluster-client');
let slugid      = require('slugid');

let taskId = slugid.v4();
// Store taskId for use in later examples to fetch status and artifacts
global.taskId = taskId;

// Task definition
let task = {
  // all standard task definition stuff here 
  provisionerId:      'aws-provisioner-v1',
  workerType:         'b2gtest',
  created:            (new Date()).toJSON(),
  deadline:           taskcluster.fromNowJSON('2 days 3 hours'),
  metadata: {
    name:             "Tutorial **Example** Task",
    description:      "Task create from _interactive_ tutorials",
    owner:            'nobody@taskcluster.net',
    source:           window.location.href
  },
  payload: {
    image:            'ubuntu:15.04',
    command:          ['/bin/bash', '-c', 'ls'],
    maxRunTime:       600,
    // Added interactive here
    features: {
      interactive: true
    }
  }
};

// Create a Queue client object with temporary credentials
let queue = new taskcluster.Queue({
  credentials: JSON.parse(localStorage.credentials)
});

// Create task
let result = await queue.createTask(taskId, task);
</pre>

Now we want to fetch the interactive artifact from the task we just created.
It might take a little bit for the task to begin running and the interactive
server to get set up, so be patient and wait until a link shows up after you
click run code below.

<pre data-plugin="interactive-example">
let taskcluster = require('taskcluster-client');
let assert      = require('assert');

// Check that we have a taskId on global object from earlier example
assert(global.taskId, "You must create a task w. a taskId first!");

// Get taskId from global object
let taskId = global.taskId;

// Create Queue client object
// Note that credentials are needed here because interactive is not
// exposed as a public artifact due to security concerns.
let queue = new taskcluster.Queue({
  credentials: JSON.parse(localStorage.credentials)
});

// Fetch artifacts from latest run of task
let url = queue.buildSignedUrl(
  queue.getLatestArtifact,
  taskId,
  'private/mozilla/interactive.html',
  { expiration: 5 * 60 }
);

// Print url for interactive artifact
console.log(url);
</pre>
