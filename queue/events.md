---
layout: default
class:  markdown
docson: true
---

RabbitMQ Exchanges
==================

We have the following **topic exchanges**:

  Exchange                  | Message Occur When
  -------------------------:|---------------------------------------------------------
  `v1/queue:task-pending`   | A task becomes pending, by creation or timeout
  `v1/queue:task-running`   | A task is scheduled on a worker
  `v1/queue:task-completed` | A task is resolved a completed by a worker
  `v1/queue:task-failed`    | A task has failed (or is canceled)


Message Routing Key
-------------------

All messages have the same **routing key format**, which is a dot (`.`)
separated list of identifiers, defined as follows:

  1. `task-id`
  2. `run-id` <i class="fa fa-asterisk" style="font-size: 80%;vertical-align: 30%; color: #999;"></i>
  3. `worker-group` <i class="fa fa-asterisk" style="font-size: 80%;vertical-align: 30%; color: #999;"></i>
  4. `worker-id` <i class="fa fa-asterisk" style="font-size: 80%;vertical-align: 30%; color: #999;"></i>
  5. `provisioner-id`
  6. `worker-type`
  7. `task.routing` (The task routing key may contain additional dots)

<div style="display: table;">
  <div style="display: table-cell;">
    <i class="fa fa-asterisk" style="font-size: 100%; padding: 5px; color: #999;"></i>
  </div>
  <div style="display: table-cell;">
    The special key `_` will be used for keys not available, for example
    `runId` for messages to `v1/queue:task-pending` which obviously haven't started running yet.
  </div>
</div>

Message Exchange Details
------------------------
This section features automatically generated documentation based on the JSON
schemas that messages are validated against, before they are posted.

### Pending Task Messages
Whenever a task becomes pending a message is posted to the `v1/queue:task-pending`
exchange. The message is guaranteed to have the following format.

<div data-render-schema="http://schemas.taskcluster.net/v1/queue:task-pending.json">
</div>


### Task Run Started Messages
Whenever a task is claimed by a worker, hence, a run is started on a worker,
a message is posted to the `v1/queue:task-running` exchange. The message is
guaranteed to have the following format.

<div data-render-schema="http://schemas.taskcluster.net/v1/queue:task-running.json">
</div>

**Notice**, that the `logsUrl` may return `404`, by the end of the run the
`logsUrl` will be valid. But this may not have happened when this message is posted.
The idea is that workers can choose to upload the `logs.json` file as the first
thing they do, in which case it'll often be available after a few minutes. This
is useful if the worker supports live logging.

### Task Completion Messages
When a task is completed by a worker a message is posted to the
`v1/queue:task-completed` exchange. This message is routed using the `run-id`,
`worker-group` and `worker-id` that completed the task. But information about
additional runs is also available from the task status structure. See message
format below.

<div data-render-schema="http://schemas.taskcluster.net/v1/queue:task-completed.json">
</div>

### Task Failure Messages
Whenever a task is concluded to be failed a message is posted to the
`v1/queue:task-failed` exchange. This happens if the task isn't completed before
its `deadlìne`, all retries failed (i.e. workers stopped responding) or
the task was canceled.

The specific _reason_ is evident from that task status structure, refer to the
`reason` property.

<div data-render-schema="http://schemas.taskcluster.net/v1/queue:task-failed.json">
</div>
