---
layout: default
class:  markdown
docson: true
---

Task Storage at `tasks.taskcluster.net`
=======================================

When a task is submitted it is given a unique `taskId`, using this identifier
it's possible to fetch the task definition, resolution, runs, build artifacts
and results. These are uploaded to S3 and publicly accessible at
`tasks.taskcluster.net`.

  Path under `tasks.taskcluster.net`    | Contents
  :-------------------------------------|-------------------------------------
  `/<taskId>/task.json`                 | Task definition as posted
  `/<taskId>/runs/<runId>/logs.json`    | Mapping from log name to URL
  `/<taskId>/runs/<runId>/result.json`  | Task result from a completed run
  `/<taskId>/resolution.json`           | Task resolution for resolved tasks

**Note**, a task may have more than one run, but `runId`s always starts from
`0`, so you can just test to see which `runId`s there is any information for.
However, if your task is resolved as completed, `resolution.json` will have the
`runId` for the run that completed the task.

**Expiration policy**, there is currently no expiration policy for the task
storage bucket. But as we move into production it is expected that one will
be applied. Hence, objects may become unavailable after a certain amount of
time, probably a few years or something.

**Redirects**, the HTTP client used to access `tasks.taskcluster.net`
**must support redirects**. In the future we may choose to let
`tasks.taskcluster.net` be a proxy in front of S3 and Azure Table Storage, as
we will be storing many small files this may improve performance for certain
operations. In this event, `tasks.taskcluster.net` may choose to redirect you
to the resource you seeks. Thus, your HTTP client **must** support redirects.


Task Definition
---------------
When a task is submitted the queue, the task definition is validated and
uploaded to **`tasks.taskcluster.net/<taskId>/task.json`**. It is therefore
safe to assume that this file is always present and have the following format:

<div data-render-schema="http://schemas.taskcluster.net/queue/v1/task.json">
</div>

Task Resolution
---------------
When a task is resolved, either completed or failed, a task resolution is
uploaded to **`tasks.taskcluster.net/<taskId>/resolution.json`**. This file
have the following format:

<div data-render-schema="http://schemas.taskcluster.net/queue/v1/resolution.json">
</div>

**Notice** that this file is not available before the task have been resolved.
You can use it to check if a task is resolved, but instead of polling S3, you
might want to subscribe to the relevant [RabbitQM Exchanges](events.html).
If you want to check the state of a task that isn't resolved you, can also use
the [queue API](api-docs.html), but again, please consider subscribing to
relevant [RabbitQM Exchanges](events.html) instead of polling.

Task Logs From a Given Run
--------------------------
When a task run is started it is assigned a `runId` that is unique for the given
`taskId`. The worker that executes the run is given a signed URL to upload a
mapping from log names to URLs to
**`tasks.taskcluster.net/<taskId>/runs/<runId>/logs.json`**. This file should
validate against the following format, but validation is the responsibility of
the worker.

<div data-render-schema="http://schemas.taskcluster.net/queue/v1/logs.json">
</div>

Notice, that **the worker may upload this file immediately**. For workers that
supports live logging, it makes a lot of sense to upload the `logs.json` file as
soon as possible in the process. Hence, it is not unlikely that this file is
available even though the run is still running or the worker died in a
mysterious way before the run was completed.

Nevertheless, it is not safe to assume that `logs.json` is available as soon as
message about the new task run is published on [AMQP](events.html). But
`logs.json` should in many cases be available a few seconds or minutes later.

Also, note that the result of the URLs contained in the `logs.json` may not be
available and it may be subject to change, in the case of live logs.


Task Result From a Given Run
----------------------------
When a task run is completed the worker must upload a `result.json` file to
**`tasks.taskcluster.net/<taskId>/runs/<runId>/result.json`**. Just like
`logs.json` this file should have the following format, but validation is the
responsibility of the worker.

<div data-render-schema="http://schemas.taskcluster.net/queue/v1/result.json">
</div>

This file is first uploaded when a run is completed, once uploaded the worker
will report the task as completed and a message will be published on
[AMQP](events.html). So it is safe to assume that the `result.json` file is
available when a task completed message is received.

**Note** this file will also be referenced in the task resolution (as documented
above) and in the task completion message published on [AMQP](events.html).


Task Artifacts
--------------
A map from artifact name to URL for artifact is present in the `result.json`
file documented above. This is always the references of artifacts from a given
run. Artifacts may be stored anywhere you should always access artifacts
through the provided download URL. Please, ensure that your HTTP client supports
redirects, as this URL may be redirected.

