---
layout:       default
class:        markdown
docson:       true
---

# Generic Worker

The generic worker is a worker which can run on any platform which supports the
go programming language. Currently this includes:

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

Since it is a _generic_ worker, it offers somewhat the _lowest common
denominator_ of functionality that a worker can provide. For example it has no
special handling of registry settings on Windows nor does it provide any
containerisation on linux. Both of these would be platform-specific,
non-generic offerings. Generic worker simply executes tasks on a best-effort
basis, with no containerisation, and cleans up as best it can after each task
completes.

The two main purposes of the generic worker are therefore:

1. A _catch all_ worker for when a more specific worker is not available
2. A worker for quick/easy prototyping and testing

Please note it is **not** intended that the generic worker will remain the
worker of choice on any platform, since it does not guarantee a clean execution
environment, nor execute tasks within a container.

## Risks

A malicious or poorly implemented task could, for example, intentionally or
accidentally corrupt Windows registry settings, or change a display resolution,
affecting subsequent tasks.

### Mitigation strategies

Several different implementation strategies were considered for the generic
worker in order to mitigate the risk of an unclean task leaving the worker
in a soiled state for a subsequent task.

1. Dismissed: Each task could run from a freshly created environment (e.g.
ami image).  After a task completes, the generic worker terminates. The
provisioner handles reprovisioning instances appropriately.
2. Dismissed: The generic worker executes tasks in a virtual machine, such as
a VirtualBox or VMware Fusion instance.
3. Accepted: The generic worker is only used for non-critical, trustworthy or
experimental purposes.

The following section provides an explanation for this decision.

### 1. Dismissed: Run tasks from a fresh image

Impact:

#### Financial

Instances are provisioned with amazon web services (aws), where any partial
compute hour is charged as a full compute hour. A task of a few seconds would
therefore be charged at 1h compute time, thus leading to significant cost for
short lived tasks.

#### Startup time

It can take in the order of minutes to spawn a new instance. In contrast, a
task can be run immediately from an already running instance.

This could be mitigated with aggressive provisioning - i.e. having idle workers
available on standby for new task requests as they arrive on the Queue. This
can be thought of as somewhat analogous to the way that hotel rooms are
managed. When a guest leaves, the room is cleaned, so that if a new unplanned
guest arrives, there is a clean room immediately available. Rather than wait
until a room is needed, rooms are proactively cleaned.

In the worker world this concept does not entirely translate. We are often
running at _maximum capacity_ and not in a position to spawn new workers.
Therefore any additional time spent spawning instances is time not spent
running a task. When not running at capacity, this also increases financial
cost, since idle workers would need to be spawned, and left running, for an
indeterminate amount of time until a new task becomes available for execution.

### 2. Dismissed: Execute tasks within a virtual machine

Impact:

#### Feasibility

As far as I am aware, Amazon does not support running virtual machines inside
its instances.

#### Performance / memory usage

This would have a heavy hit on performance and memory usage, and could preclude
running a generic worker on e.g. a smartphone.

### 3. Accepted: Do not guarantee a clean environment

Impact:

#### Risk

The risk is that a dirty environment can impact subsequent tasks. This can be
mitigated by:

1. Write well-behaved tasks
2. Only use generic worker for prototyping / controlled / non-critical tasks
3. Create other classes of worker, such as a Mac Worker and Windows Worker as a
safe alternative to the generic worker.

Option 3 was considered to offer the best solution.

Therefore the generic worker comes with the following important caveats:

* Each task is responsible for returning the worker to its original state
before completing.
* The generic worker is intended for running _trusted tasks_ only
* The generic worker should only be used if no alternative is available
* Provisioners of the generic worker must recycle workers regularly

## Generic Worker payload definition

When submitting a task graph to the Task Cluster scheduler (see
[createTaskGraph](/scheduler/api-docs/#createTaskGraph)) you must provide a
payload for defining the tasks to be executed by the worker. In the case of the
generic worker, the payload must conform to the following schema.

<div data-render-schema="http://schemas.taskcluster.net/generic-worker/v1/payload.json"></div>

The payload comprises of a command to run, environment variables to be set
(optionally encrypted) and a timeout for the task (`maxTimeRun`).

The worker will run the task, upload log files, and report back status to the Queue.


## Environment

Environment variables can be provided in the task payload and will be added to the
current environment configuration.  Environment variables can be both encrypted or
plain text.  Refer to the [Encrypted Environment Variables](#encrypted-environment-variables)
section for more information.

### Reserved Environment Variables

In addition to any environment (env) variables given we also provide every
task with the following environment variables these are mandatory
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

In the example below, encrypted(raw-message) is a gpg encrypted object using
the public key located at
[references.taskcluster.net](http://references.taskcluster.net/generic-worker/v1/generic-worker-pub.pem).
Encrypted environment variables are then base64 encoded and included under
encryptedEnv in the task payload.

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

Once decrypted, the variable can be referenced just like any other environment
variable.

```js
{
  "command": ["/bin/bash", "-c", "echo $SECRET_TOKEN"]
}
```

# Design

The generic worker should be able to run on just about any virtual or physical device, including a handset, so it was important in the design to choose a programming language that would be supported on all conceivable platforms, and would perform well on slow processors with little memory consumption, and very few software dependencies. For all of these reasons, the [go language](http://golang.org/) was chosen.

One challenge with writing a completely native go implementation, is that there is a small stack of components that the worker depends on that would also need to be ported to go:

1. [TaskCluster Go Client](http://taskcluster.github.io/taskcluster-client-go)
2. [Json Schema 2 Go code generator](http://taskcluster.github.io/jsonschema2go)
3. [Mozilla Pulse Go Client](http://taskcluster.github.io/pulse-go)
4. [Generic Worker](http://taskcluster.github.io/generic-worker)

# TaskCluster Go Client

The core TaskCluster stack essentially comprises of a suite of REST API methods, and a set of AMQP topic exchanges for intercomponent message handling. Therefore the first task in writing a component that can interface with the core TaskCluster services, was porting the TaskCluster client to go.

The TaskCluster client is a go library that can be imported into a go project, and provides native methods for making remote TaskCluster service calls. Here you can see the library documentation:

* http://godoc.org/github.com/taskcluster/taskcluster-client-go/auth
* http://godoc.org/github.com/taskcluster/taskcluster-client-go/index
* http://godoc.org/github.com/taskcluster/taskcluster-client-go/queue
* http://godoc.org/github.com/taskcluster/taskcluster-client-go/queueevents
* http://godoc.org/github.com/taskcluster/taskcluster-client-go/scheduler
* http://godoc.org/github.com/taskcluster/taskcluster-client-go/schedulerevents

This allows a client to make remote calls to TaskCluster endpoints by calling a method in the local library. The library also includes native go types that represent the data structures used by the API methods and topic exchanges.

Since the TaskCluster apis are not static, it was also important to create something that could easily be updated as and when TaskCluster APIs change. Fortunately, schemas are published for all of the TaskCluster api definitions, so at the heart of the taskcluster client codebase is a go program to generate the rest of the taskcluster client library codebase. Writing a code generator that consumes the schema definitions ensured an easy way to update the library whenever the schemas change, albeit making the initial implementation considerably complex.

Since the go programming language is relatively new, there were no open source libraries available also to generate go types based on json schema definitions, therefore the next piece of the stack to build was a generic library that could convert json schema definitions into structured go type definitions... This was implemented as a standalone project called jsonschema2go...

* Website: http://taskcluster.github.io/taskcluster-client-go
* Docs: https://godoc.org/github.com/taskcluster/taskcluster-client-go
* CI: http://travis-ci.org/taskcluster/taskcluster-client-go
* Source Code: https://github.com/taskcluster/taskcluster-client-go
* Status: completed

# Json Schema 2 Go

As stated above, due to the relative immaturity of the go programming language and the json schema specification, at the time of writing the Task Cluster Go Client, there were no libraries discovered that could generate structured go types based on json schema. Therefore jsonschema2go was created as an open source project to do precisely this. This involved implementing the [full json schema specification](http://spacetelescope.github.io/understanding-json-schema/) in go.

Hopefully this library will service other go open source projects that also wish to support json schema.

* Website: http://taskcluster.github.io/jsonschema2go
* Docs: https://godoc.org/github.com/taskcluster/jsonschema2go/jsonschema2go
* CI: http://travis-ci.org/taskcluster/jsonschema2go
* Source Code: https://github.com/taskcluster/jsonschema2go
* Status: completed

# Pulse Go

Another feature of the TaskCluster client library is that it needs to be able to interface with AMQP (Mozilla Pulse) exchanges. Although not directly called by the Generic Worker, the AMQP interaction is a key function of the Task Cluster client library, so needed to be written.

Rather than write something task cluster specific, it made sense to write a generic Mozilla Pulse library, and use that under the hood. Therefore the pulse-go client was developed for this purpose. It is a fully fledged pulse client that is extensible, and can be used for consuming messages on any Pulse exchange.

* Website: http://taskcluster.github.io/pulse-go
* Docs: https://godoc.org/github.com/taskcluster/pulse-go
* CI: http://travis-ci.org/taskcluster/pulse-go
* Source Code: https://github.com/taskcluster/pulse-go
* Status:
  - consuming messages - completed
  - publishing messages - not yet implemented

Please note the TaskCluster client extends this library to introduce task cluster specific logic/setup on top of the basic pulse library. This means the TaskCluster client provides mechanisms to handle task cluster specific routing keys and exchanges.

# Generic Worker

The generic worker is the last, and topmost member of the stack. Rather than work heavily on a design document, a partially complete implementation has been written.

Currently the worker can be deployed, it will listen for tasks, execute them, and report back their status correctly.

The worker has been implemented according to [this specification](/queue/worker-interaction/).

* Website: http://taskcluster.github.io/generic-worker
* Docs: https://godoc.org/github.com/taskcluster/generic-worker
* CI: http://travis-ci.org/taskcluster/generic-worker
* Source Code: https://github.com/taskcluster/generic-worker
* Status:
  - talking to queue, claiming tasks, publishing results: complete
  - publishing artifacts, encrypted environment variables, robust retry mechanisms, environment cleanup: not yet implemented

# Next steps

Q1 2015 was about planning a design for the TaskCluster Generic Worker, and Q2 was meant to be for implementation. Already a lot of the implementation has been completed in Q1, so Q2 will be about completing the remaining parts, and hardening them up with real world usage.

# Getting started with Generic Worker

Although the generic worker is not yet fully implemented, or feature complete, here is some information about how you might use it when it is ready. This might also serve as a useful guide if you interested in contributing to its development.

## Install go compiler

Head over to http://golang.org/doc/install and follow the instructions for your platform. Be sure to set your GOPATH to something appropriate.

## Install generic worker

```
go get github.com/taskcluster/generic-worker
```

## Create TaskCluster account

Head over to https://tools.taskcluster.net/auth/ and create yourself an account with scopes `*` and a decently long expiry for running jobs. Keep a note of the ClientId and AccessToken you are given.

## Set up your env

```
export PAYLOAD_SCHEMA="${GOPATH}/src/github.com/taskcluster/generic-worker/schema.json"
export PROVISIONER_ID='<choose_whatever_you_like>'
export REFRESH_URLS_PREMATURELY_SECS=20
export TASKCLUSTER_ACCESS_TOKEN='<your_access_token_from_above>'
export TASKCLUSTER_CLIENT_ID='<your_client_id_from_above>'
export WORKER_GROUP='<anything>'
export WORKER_ID='<something_to_identify_your_machine_eg_hostname>'
export WORKER_TYPE='<choose_whatever_you_like>'
```

You may also consider putting this in a file that is sourced when your shell starts.

## Start the generic worker

Simply run:

```
generic-worker
```

and watch logs for a successful startup. If you can see it is polling the Queue, and the process does not exit, then you can continue. If it reports a problem, follow any instructions it provides. If you are really stuck, join #taskcluster channel on irc.mozilla.org, and ask for help.

It should look something like this:

```
pmoore@laptop:~ $ generic-worker
2015/03/27 15:39:55   Delete URL: https://taskclusterqueuev1.queue.core.windows.net/queue-uxvv56u25c7cwivco6vq-uxvv56ykfoi6u-1/messages/{{messageId}}?popreceipt={{popReceipt}}&st=2015-04-20T13%3A24%3A55Z&se=2015-04-20T14%3A09%3A55Z&sp=p&sv=2014-02-14&sig=hQvrbc5zPVsaHFZ9EA5JpTl0OedEt20ED3I2wnt9AAw%3D
2015/03/27 15:39:55   Poll URL:   https://taskclusterqueuev1.queue.core.windows.net/queue-uxvv56u25c7cwivco6vq-uxvv56ykfoi6u-1/messages?visibilitytimeout=300&st=2015-04-20T13%3A24%3A55Z&se=2015-04-20T14%3A09%3A55Z&sp=p&sv=2014-02-14&sig=hQvrbc5zPVsaHFZ9EA5JpTl0OedEt20ED3I2wnt9AAw%3D
2015/03/27 15:39:56 Zero tasks returned in Azure XML QueueMessagesList
2015/03/27 15:39:56 No task claimed from any Azure queue...
2015/03/27 15:39:56 Zero tasks returned in Azure XML QueueMessagesList
2015/03/27 15:39:56 No task claimed from any Azure queue...
2015/03/27 15:39:57 Zero tasks returned in Azure XML QueueMessagesList
2015/03/27 15:39:57 No task claimed from any Azure queue...
2015/03/27 15:39:58 Zero tasks returned in Azure XML QueueMessagesList
2015/03/27 15:39:58 No task claimed from any Azure queue...

```

## Create a test job

Go to https://tools.taskcluster.net/task-creator/ and create a task to run on your generic worker.

This page provides a decent example task, but first make sure to edit `provisionerId` value should match what you set your `PROVISIONER_ID` env variable to, and the value of `workerType` should match what you set your `WORKER_TYPE` env variable to.

Please note you should *NOT* use the default value of `aws-provisioner` for the `provisionerId` since then the production aws provisioner may start spawning ec2 instances, and the docker-worker may try to run the job. By specifying something unique for your local environment, the aws provisioner and docker workers will leave this task alone, and only your machine will claim the task.

Don't forget to submit the task by clicking the *Create Task* icon.

If all is well, your local generic worker should pick up the job you submit, run it, and report back status.

*Please note the Generic Worker is still undergoing development, and is not complete yet.*
