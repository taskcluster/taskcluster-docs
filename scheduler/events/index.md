---
layout: default
class:  markdown
docson: true
---

Task-Graph Scheduler Exchanges
==============================

The task-graph scheduler offers the following **topic exchanges**:

  Exchange                            | Message Occur When
  -----------------------------------:|-----------------------------------------
  `scheduler/v1/task-graph-running`   | A task-graph is submitted
  `scheduler/v1/task-graph-blocked`   | A task-graph becomes blocked
  `scheduler/v1/task-graph-finished`  | A task-graph is finished successfully


Message Routing Key
-------------------
All messages have the same **routing key format**, which is a dot (`.`)
separated list of identifiers, defined as follows:

  1. `_._._._._._` <i class="fa fa-asterisk" style="font-size: 80%;vertical-align: 30%; color: #999;"></i>
  2. `schedulerId`
  3. `taskGraphId`
  4. `taskGraph.routing` (The task-graph routing key may contain additional dots)

<div style="display: table;">
  <div style="display: table-cell;">
    <i class="fa fa-asterisk" style="font-size: 100%; padding: 5px; color: #999;"></i>
  </div>
  <div style="display: table-cell;">

    The first part of the routing key is always th special constant
    <code>_._._._._._</code>. This ensures that the <code>schedulerId</code>,
    <code>taskGraphId</code> and <code>taskGraph.routing</code> keys appears in
    the same index as they will have in the routing keys for the task messages
    sent by the queue.

    This is the case because the task-graph scheduler will prefix all
    task-specific routing keys with <code>schedulerId</code>,
    <code>taskGraphId</code> and <code>taskGraph.routing</code>.

    The result is that you can use the same routing pattern for queue exchanges
    as is used when listening to scheduler exchanges.
  </div>
</div>

Message Exchange Details
------------------------
This section features automatically generated documentation based on the JSON
schemas that messages are validated against, before they are posted.

### Task-Graph Running Message
Whenever a task-graph is submitted a message will be posted to
`scheduler/v1/task-graph-running` exchange.
The message is guaranteed to have the following format.

<div data-render-schema="http://schemas.taskcluster.net/scheduler/v1/task-graph-running-message.json">
</div>


### Task-Graph Blocked Messages
When a task is completed unsuccessfully and all _reruns_ have been attempted,
the task-graph will not complete successfully and it's declared to be blocked,
by some task that consistently completes unsuccessfully.

When a task-graph becomes blocked a message is posted to the
`scheduler/v1/task-graph-blocked` exchange. The message is guaranteed to have
the following format.

<div data-render-schema="http://schemas.taskcluster.net/scheduler/v1/task-graph-blocked-message.json">
</div>

### Task-Graph Finished Messages
When all tasks of a task-graph have completed successfully, the task-graph is
declared to be finished, and a message is posted to the
`scheduler/v1/task-graph-finished` exchange.
The message is guaranteed to have the following format.

<div data-render-schema="http://schemas.taskcluster.net/scheduler/v1/task-graph-finished-message.json">
</div>
