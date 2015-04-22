---
layout:       default
class:        markdown
docson:       true
---

# Docker Worker

This worker is designed to handle tasks on linux via
[docker](http://www.docker.com/).

The worker being based on docker allows you to execute just about any task that
runs on linux in a portable fashion (i.e you can run it locally, on another CI
system, etc...) with none to minimal taskcluster specifics built into your images.

## Queue `.payload` schema

<div data-render-schema="http://schemas.taskcluster.net/docker-worker/v1/payload.json"></div>


## Environment

Environment variables can be provided in the task payload and will be added to the
current environment configuration.  Environment variables can be both encrypted or
plain text.  Refer to the [Encrypted Environment Variables](#encrypted-environment-variables)
section for more information.

### Reserved Environment Variables

In addition to any environment (env) variables given we also provide every
docker-worker task with the following environment variables these are mandatory
and override any task provided values.

    - `TASK_ID` : The current task id.
    - `RUN_ID` : The current run id for the task.

Note that environment variables can also be used in the `command` field.

```json
{
  "command": ["/bin/bash", "-c", "curl https://queue.taskcluster.net/v1/task/$TASK_ID"]
}
```

### Encrypted Environment Variables

Environment variables can be encrypted to allow secure transmission of private information
such as access tokens, passwords, etc. Secure environment variables will be encrypted
using a public key and then base64 encoded prior to submitting the task.

Each encrypted environment variable must include the message version, task ID,
start and end time, and the name and value of the environment variable.

Encrypted variables are validated by inspecting the task ID as well as the start
and end times to prevent stealing/tampering of the secured variables.

Note: Because the task ID and timestamps are used during validation, this prevents
encrypted variables being reused between tasks (e.g. manual job retriggers on treeherder).

In the example below, encrypted(raw-message) is a gpg encrypted object using the
public key located at [references.taskcluster.net](http://references.taskcluster.net/docker-worker/v1/docker-worker-pub.pem).
Encrypted environment variables are then base64 encoded and included under encryptedEnv in the task payload.

Raw message example:

```js
{
  "messageVersion":     1,
  "taskId":             "<taskId>",
  "startTime":          1418146006679, // As number of ms since epoch
  "endTime":            1418146036679, // As number of ms since epoch
  "name":               "SECRET_TOKEN",
  "value":              "<secret-value>"
}
```

Task payload example with encrypted raw message:

```js
{
  "task": {
    [...]
    "payload": {
      [...]
      "encryptedEnv": ["<base64(encrypted(raw-message))>"]
    }
  }
}
```

Once decrypted within docker-worker, the variable can be referenced just like any other environment variable.

```js
{
  "command": ["/bin/bash", "-c", "echo $SECRET_TOKEN"]
}
```

### Features

Features are services provided by docker-worker that give tasks additional
capabilities and in some cases the ability to communicate with external
resources that would otherwise be unavailable.

These features are enabled by declaring them within the task payload in the
`features` object.

Note: Some features require additional information within the task definition.
Consult the documentation for each feature to understand the requirements.

Example:
```js
{
  "payload": {
    "features": {
      "exampleFeature": true
    }
  }
}
```

#### Features: `balrogVPNProxy`

Some tasks have the need for communicating with production balrog server over
port 80 through a vpn tunnel.  The balrog vpn proxy feature allows a task to
direct requests to http://balrog which will proxy the request over a vpn connection
to production balrog.

This is a restricted feature and taskcluster credentials of the submitter must
contain scopes for `docker-worker:feature:balrogVPNProxy`.

To enable, the task must contain the proper scope as well as be declared in
the `features` object within the task payload.

Example:
```js
{
  "scopes": ["docker-worker:feature:balrogVPNProxy"],
  "payload": {
    "features": {
      "balrogVPNProxy": true
    }
  }
}
```

References:
* [taskcluster-vpn-proxy](https://github.com/taskcluster/taskcluster-vpn-proxy)
* [docker-worker integration](https://github.com/taskcluster/docker-worker/blob/master/lib/balrog_vpn_proxy.js)

#### Features: `taskclusterProxy`

The taskcluster proxy provides an easy and safe way to make authenticated
taskcluster requests within the scope(s) of a particular task.

For example lets say we have a task like this:

```js
{
  "scopes": ["a", "b"],
  "payload": {
    "features": {
      "taskclusterProxy": true
    }
  }
}
```

A special docker container is linked to your task contained named "taskcluster"
with this container linked you can make requests to various taskcluster services
with _only_ the scopes listed in the task (in this case ["a", "b"])

| Host | Service |
|---------------------------------|-------------------------------|
| queue.taskcluster.net           | taskcluster/queue/            |
| scheduler.taskcluster.net       | taskcluster/scheduler/        |
| index.taskcluster.net           | taskcluster/index/            |
| aws-provisioner.taskcluster.net | taskcluster/aws-provisioner/  |

For example (using curl) inside a task container.

```sh
curl taskcluster/queue/v1/<taskId>
```

You can also use the `baseUrl` parameter in the taskcluster-client

```js
var taskcluster = require('taskcluster-client');
var queue = new taskcluster.Queue({
 baseUrl: 'taskcluster/queue/v1'
 });

queue.getTask('<taskId>');
```

References:
* [taskcluster-proxy](https://github.com/taskcluster/taskcluster-proxy)
* [docker-worker integration](https://github.com/taskcluster/docker-worker/blob/master/lib/features/taskcluster_proxy.js)

#### Features: `testdroidProxy`

Source: https://github.com/taskcluster/testdroid-proxy

The testdroid proxy allows a task to request and release a device by making
the appropriate calls to http://testdroid.  These actions are documented in the
testdroid-proxy
[documentation](https://github.com/taskcluster/testdroid-proxy/blob/master/README.md).

Example:
```js
{
  "payload": {
    "features": {
      "testdroidProxy": true
    },
  }
}
```

References:
* [testdroid-proxy](https://github.com/taskcluster/testdroid-proxy)
* [docker-worker integration](https://github.com/taskcluster/docker-worker/blob/master/lib/features/testdroid_proxy.js)
