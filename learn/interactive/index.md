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
  workerType:         'ami-test',
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
  },
  scopes: ['docker-worker:features:*']
};

// Create a Queue client object with temporary credentials
let queue = new taskcluster.Queue({
  credentials: JSON.parse(localStorage.credentials)
});

// Create task
let result = await queue.createTask(taskId, task);

console.log('Please inspect the task at:');
console.log("https://tools.taskcluster.net/task-inspector/#" + taskId);
</pre>

Now we want to fetch the interactive artifact from the task we just created.
It might take a little bit for the task to begin running and the interactive
server to get set up, so wait until the link leads to a terminal and not an
`Artifact not found` message.

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
  'private/docker-worker/interactive.html',
  { expiration: 5 * 60 }
);

// Print url for interactive artifact
console.log(url);
</pre>

You can now play around with the interactive terminal as much as you
would like! Without a connection, the task will live for at least 3 
minutes, giving you ample time after starting to connect with an 
interactive session. Once you are connected, it will stay alive until 
you disconnect, and will linger around for 15 minutes in case you need to 
connect again.

We can also directly use the node client to connect to the websocket 
server using the `private/docker-worker/interactive.sock` artifact. 
It features `client.stdin`, `client.stdout`, and `client.stderr` 
streams which can be piped into and out of, and an `'exit'` event which 
returns the exit code. We could possibly use this client to transfer large
files via `cat`, or we can just pipe `process.stdin, stdout, stderr` to 
their respective destinations and use it as a normal terminal.

In this case, we're just going to settle for running `/bin/bash` and 
sending an`ls` command.

<pre data-plugin="interactive-example">
let taskcluster = require('taskcluster-client');
let assert      = require('assert');
let http        = require('http');
let DockerClient = require('docker-exec-websocket-server').DockerExecClient;

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

async function getArtifact (queue, taskId) {
  async function getWithoutRedirect (url) {
    let res = await new Promise((resolve, reject) => {
      https.request(url, (res) => {
        resolve(res);
      }).end();
    });
    if (res.statusCode === 303) {
      return res.headers.location;
    } else {
      console.log(res)
      throw new Error('Error with code ' + res.statusCode + ' : ' + res.statusMessage);
    }
  };
  let signedUrl = queue.buildSignedUrl(
    queue.getLatestArtifact,
    taskId,
    'private/docker-worker/interactive.sock',
    { expiration: 5 * 60 }
  );

  return getWithoutRedirect(signedUrl);
}

let url = await getArtifact(queue, taskId);
console.log('Connecting to ' + url);

//Making the Docker exec client
let client = new DockerClient({
  url: url,
  //Don't enable tty
  tty: false,
  command: ['/bin/bash']
});
await client.execute();

client.stdin.write('ls\n');
client.stdout.on('data', (data) => {
  console.log(data.toString());
});
</pre>
