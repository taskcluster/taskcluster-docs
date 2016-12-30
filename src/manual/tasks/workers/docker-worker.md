---
title: Docker Worker
order: 1
docson: true
---

This worker is designed to handle tasks on linux via
[docker](http://www.docker.com/).

The worker being based on docker allows you to execute just about any task that
runs on linux in a portable fashion (i.e you can run it locally, on another CI
system, etc...) with none to minimal taskcluster specifics built into your images.

---

## Queue payload schema

<div data-render-schema="http://schemas.taskcluster.net/docker-worker/v1/payload.json"></div>

---

## Scopes

Certain task features/capabilities require the use of docker-worker specific scopes in the form of `docker-worker:...` . For details about scopes needed for features, images, and caches, consult the documentation for each topic.

Currently docker-worker has types of scopes:

#### Features
Scope format: `docker-worker:feature:<feature name>`. These are features that will be linked to the container when the task runs.

#### Images
Scopes format: `docker-worker:image:<registry>/<user>/<image>:<tag>`. Scopes for images are necessary when the image requires authentication with a registry (e.g. private images). Public images do not require scopes.

#### Caches
Scopes begin with `docker-worker:cache:<cache name>`. Tasks that require cached volumes to be mounted must supply a scope for that cache. This is to restrict accessing, and possibly corrupting, caches no related to the scope of credentials provided.

---

## Environment

Environment variables can be provided in the task payload and will be added to the
current environment configuration. Environment variables can be both encrypted or
plain text. Refer to the [Encrypted Environment Variables](#encrypted-environment-variables)
section for more information.

#### Reserved Environment Variables

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

#### Encrypted Environment Variables

**WARNING**: we do not recommend using encrypted environment variables.
Instead, prefer to use the secrets service.  Encrypted environment variables
are currently secure, but if the private key is ever disclosed, *all* formerly
protected values will be readable to anyone posessing that key.  This section
remains here only for reference, since encrypted environment variables are
still in use for some tasks.

---

Environment variables can be encrypted to allow secure transmission of private information
such as access tokens, passwords, etc. Secure environment variables must be encrypted
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

---

## Features

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

#### Feature: `balrogVPNProxy`

Required scopes: `docker-worker:feature:balrogVPNProxy`

Some tasks have the need for communicating with production balrog server over
port 80 through a vpn tunnel. The balrog vpn proxy feature allows a task to
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

#### Feature: `taskclusterProxy`

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
| secrets.taskcluster.net         | taskcluster/secrets/          |
| auth.taskcluster.net            | taskcluster/auth/             |
| hooks.taskcluster.net           | taskcluster/hooks/            |
| purge-cache.taskcluster.net     | taskcluster/purge-cache/      |

and maybe more - see [the source](https://github.com/taskcluster/taskcluster-proxy/blob/master/taskcluster/services.go).

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

#### Feature: `testdroidProxy`

Source: https://github.com/taskcluster/testdroid-proxy

The testdroid proxy allows a task to request and release a device by making
the appropriate calls to http://testdroid. These actions are documented in the
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

#### Feature: `dockerSave`

Status: Unstable, api may be changed

When this feature is activated, after the task finishes, a copy of the container is saved using `docker commit`, converted into a tarball with `docker save`, and uploaded to s3 under the filename `public/dockerImage.tar`. The image itself will have repository `task-${taskId}-${runId}:latest` and tag `:latest`.

Example:

```js
{
  "payload": {
    "features": {
      "dockerSave": true
    },
  }
}
//run task
```

Then, once the task finishes, the resulting image can be pulled and run in the following manner:

```bash
wget https://queue.taskcluster.net/v1/task/${taskId}/runs/${runId}/artifacts/public/dockerImage.tar
docker load < dockerImage.tar
docker run -it task-${taskId}-${runId}:latest /bin/sh
```

Caches are also uploaded as artifacts under `public/cache/${cacheName}.tar` if they exist, to give the full environment under which the container is running. They be added by adding `-v host/cache:container/cache` as an option where the locations match the untarred cache on your machine and the targeted location in the container's payload.

References:

* [implementation](https://github.com/taskcluster/docker-worker/blob/master/lib/features/docker_save.js)

#### Feature: `interactive`

Allows ssh-like access to running containers. Will extend the lifetime of a task to allow a user to SSH in before the container dies, so be careful when using this feature. Will also keep the task alive while is connected and a little bit after that so a user can keep working in ssh after the task ends.

Example:

```js
{
  "payload": {
    "features": {
      "interactive": true
    },
  }
}
```
Then click on the `interactive.html` on task inspector link to enter the container.

References:

* [docker-worker integration](https://github.com/taskcluster/docker-worker/blob/master/lib/features/interactive.js)
* [implementation](https://github.com/taskcluster/docker-exec-websocket-server)

#### Feature: `relengAPIProxy`

Status: stable, but limited access

Like the Taskcluster proxy, this proxy allows easy and safe access to RelengAPI without embedding RelengAPI credentials in the task.

The task must indicate the RelengAPI permissions it needs using scopes of the form `docker-worker:relengapi-proxy:<permission>`.
Wildcard expansion is not allowed.

Example:

```js
{
  "scopes": [
    "docker-worker:relengapi-proxy:tooltool.download.internal"
  ],
  "payload": {
    "features": {
      "relengAPIProxy": true,
    }
  }
}
```

Requests can then be made from the task container, using `http://relengapi` in place of `https://api.pub.build.mozilla.org`.

The set of allowed RelengAPI permissions are currently limited to

 * `tooltool.download.public`
 * `tooltool.download.internal`

References:

* [relengapi-proxy](https://github.com/taskcluster/relengapi-proxy)

#### Feature: `allowPtrace`

Status: stable

This feature allows tasks to use the ptrace(2) syscall.
The Firefox crash reporter, for example, requires this functionality.

The feature accomplishes its magic by creating a task-specific AppArmor profile that allows any process in the profile to trace any other process in the profile.
While this should be safe, assuming that all processes in the task container are at an equal privilege level, it is a deviation from the Docker security model and thus should be used with caution.

## Volume Caches

Require Scopes: `docker-worker:cache:<cache name>`

Docker-worker has the ability to provide volumes mounted within the task container that can persist between tasks. This provides a way of caching large often used files (repos, object directories) and share them between tasks.

Volume caches falls under the garbage collection policies when diskspace threshold is reached. Any cached volumes that are no longer mounted within a container are removed from the host system when this event occurs.

Tasks need to define a name for the cache that will be used for other tasks requiring the same cached volume as well as a mount point for where the volume will be mounted within the task container.

Example:

```js
{
  "scopes": [
    "docker-worker:cache:b2g-object-directory"
  ],
  "payload": {
    "cache": {
      "b2g-object-directory": "/path/for/mount/point"
    }
  }
}
```

## Superseding

In some casse, the demand for tasks outstrips the available resources to run those tasks, and pending counts on queues start to grow.
In many cases, executing some tasks in the queue can render others unnecessary.
For example, if the test tasks for a later version-control revision succeed, then tests for earlier revisions can be skipped.
Such earlier tasks are said to be "superseded" by the later task.

Docker-worker supports superseding multiple tasks, executing only one (the "primary task").
Crucially, the primary task need not be the same task that the worker found on the queue, but may be one deeper into the queue (e.g., a change pushed to version control later).
It does so with the help of a superseder service, specified in the task payload as `supersederUrl`:

Example:

```js
{
    "supersederUrl": "https://foo-coalescer.herokuapp.com/build/linux/master"
}
```

The docker-worker will append the taskId of the task it has received from the queue (the "initial taskId") as a query argument, `?taskId=<taskId>`.
The supserseding task is free to interpret the URL path in any way.

The supserseder returns a list of taskIds, including the initial taskId, in the `supersedes` property of the response body.
The list is sorted such that each task supersedes all tasks appearing earlier in the list.
The worker will attempt to claim each task, and execute the highest-indexed task for which `claimTask` succeeds -- this task becomes the primary task.

Continuing the example, given an initial taskId of `E5SBRfo-RfOIxh0V4187Qg`, the foo-coalescer service might respond with

```js
{
    "supersedes": [
        "E5SBRfo-RfOIxh0V4187Qg",
        "909mRog1E98Va0g-bb91ba",
        "KGt8egfvRaqxczIRgOScaw"
    ]
}
```

This indicates that, for this coalescing key, the best task to execute is `KGt8egfvRaqxczIRgOScaw`, superseding `909mRog1E98Va0g-bb91ba` and `E5SBRfo-RfOIxh0V4187Qg`.
The worker would try to claim all three tasks.
If the claims succeeded for all but the last task, then it would consider `909mRog1E98Va0g-bb91ba` the primary task and execute it.
Note that this is not the same task that it received from the queue!

When the primary task completes, all of the secondary tasks are resolved as exception/superseded, with an artifact named `public/superseded-by.json` containing the `taskId` and `runId` of the primary task.
The primary task gets an artifact named `public/superses.json` with a list of `{taskId, runId}` for the tasks it supersedes.
