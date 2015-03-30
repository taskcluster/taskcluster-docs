---
layout:       default
class:        markdown
docson:       true
---

# Generic Worker

The generic worker is a worker which can run on any platform which supports the
go programming lanuage. Currently this includes:

Platform | Architecture
---------|-------------
darwin   | 386
darwin   | amd64
freebsd  | 386
freebsd  | amd64
linux    | 386
linux    | amd64
linux    | arm
windows  | 386
windows  | amd64

The two main purposes of the generic worker are:

1. A _catch all_ worker for when a more specific worker is not
available
2. A worker for quick/easy prototyping and testing

Please note it is **not** intended that the generic worker will remain the
worker of choice on any platform, since it does not guarantee a clean execution
environment, nor execute tasks within a container. Since it is _generic_, it
offers somewhat the _lowest common denominator_ of functionality that a worker
can provide. For example it has no special handling of registry settings on
Windows nor does it provide any containerisation on linux. Both of these would
be platform-specific, non-generic offerings. Generic worker simply executes
tasks on a best-effort basis, with no containerisation, and cleans up as best
it can after each task completes.

## Risks

A malicious or poorly implemented task could, for example, corrupt Windows
registry settings, or change a display resolution, affecting subsequent tasks.
Since the generic worker offers no isolation or containerisation for task
execution, **each task is responsible for its own cleanup.**

For this reason the generic worker is intended for running _trusted tasks_
only.

### Mitigation strategies

We have discussed various approaches to limit worker contamination between
tasks.

The options we considered are:

1. Each task runs from a fresh image. After a task completes, the generic
worker terminates. The provisioner handles reprovisioning instances
appropriately.
2. The generic worker executes tasks in a virtual machine, such as a VirtualBox
or VMware Fusion instance.
3. Accept risk of worker contamination, choose carefully what tasks use generic
worker.

This section provides a succint summary of these options we considered, and the
design decision we reached.

### 1. Run tasks from a fresh image

Impact:

#### Financial

We provision our instances with amazon web services (aws), where
instances are billed a full compute hour for any partial hour used. This means
a minimum 1h fee associated to the creation of any instance, even when it is an
instance launched for a task that just takes seconds to complete.

#### Startup time

It can take in the order of minutes to spawn a new instance. In contrast, a
task can be run immediately from an existing container.

However, this could be mitigated with aggressive provisioning - i.e. having
idle workers available on standby for new task requests as they come in. This
can be thought of as somewhat analagous to the way that hotel rooms are
managed. When a guest leaves, the room is cleaned, so that if a new unplanned
guest arrives, there is a clean room immediately available. Rather than wait
until a room is needed, rooms are proactively cleaned.

In the worker world this concept does not entirely translate. We are often
running at _maximum capacity_ and not in a position to spawn new workers.
Therefore any additional time spent spawning instances is time not spent
running a task. When not running at capacity, this also increases financial
cost, since idle workers also cost money.

### 2. Execute tasks within a virtual machine

Impact:

#### Feasibility

As far as I am aware, Amazon does not support running virtual machines inside
its instances.

#### Performance / memory usage

This would have a heavy hit on performance and memory usage, and e.g. would not
be feasible running a generic worker on a smartphone.

### 3. Do not guarantee a clean environment

Impact:

#### Risk

The risk is that a dirty environment can impact subsequent tasks. This can be
mitigated by:

1. Write well-behaved tasks
2. Only use generic worker for prototyping / controlled / non-critical tasks
3. Create other classes of worker, such as a Mac Worker and Windows Worker as a
safe alternative to generic worker as soon as possible

### Chosen solution: option 3

Because of these limitation it is strongly recommended that tasks only use the
generic worker if there is no alternative available, and that extra care and
attention is paid to leaving workers in a clean state of health at the
conclusion of a task, wherever possible. Additionally, in order to mitigate
risks from non-clean workers providing invalid task results, the provisioner(s)
of the generic worker must recycle the workers regularly.

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

### Features: `taskclusterProxy`

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
