---
title: Scheduler
order: 3
sequence_diagrams:  true
---

Task-Graph Scheduling
=====================
The task-graph scheduler, hosted at **`scheduler.taskcluster.net`**, is
responsible for scheduling dependent tasks with the queue. In this framework
the queue ensures execution, but it does not handle dependencies, nor is the
queue aware of task specific results. The queue only cares about task
completion, specifically that a task completed in a predictable manner.

The task-graph scheduler on the other hand, doesn't care about which tasks are
pending, whether or not machines crashes, etc. It cares about the result of
completed tasks. Hence, when a task completes it is the task-graph scheduler
that schedules dependent tasks, or tries to rerun the task if it completed
unsuccessfully.

**Notice**, the distinction between _rerun_ and _retry_, the queue _retries_ as
task if the worker failed to respond (ie. crashed), the scheduler _reruns_ a
task if the task completed unsuccessfully, (ie. the task payload command exited
non-zero).

Scheduler Interaction Example
-----------------------------
The following diagram illustrates how the task-graph scheduler defines tasks
from a task-graph on the queue, then schedules tasks without dependencies, in
this case taskA. When the task is completed by the queue, cooperation with
workers and provisioners, the scheduler picks up the next task completed
message and schedules any dependent tasks or reports the task-graph finished.

<div class="sequence-diagram-hand" style="margin:auto;">
participant Client
participant Scheduler
participant RabbitMQ
participant Queue

Client      ->  Scheduler   : Post task-graph
Scheduler   ->  RabbitMQ    : Bind completed tasks
Scheduler   ->  Queue       : Define taskA and taskB
Scheduler   ->  Queue       : Schedule taskA
Note over Queue : Worker completes taskA from queue
Queue       ->  RabbitMQ    : TaskA completed
RabbitMQ    --> Scheduler   : TaskA completed
Scheduler   ->  Queue       : Schedule taskB
Note over Queue : Worker completes taskB from queue
Queue       ->  RabbitMQ    : TaskB completed
RabbitMQ    --> Scheduler   : TaskB completed
Scheduler   ->  RabbitMQ    : Task-graph finished
</div>

If a task was to fail, the task-graph scheduler would report the task-graph as
blocked.
