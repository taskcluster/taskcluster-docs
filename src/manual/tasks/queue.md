---
title: Queues
order: 10
sequence_diagrams:  true
---

The [queue service](/reference/platform/queue), hosted at
**`queue.taskcluster.net`**, is the centralized coordinator that is responsible
for accepting tasks, managing their state, and assigning them to consumers that
claim them.

The queue service maintains the task queues. Task queues are named, with the
names having the form `<provisionerId>/<workerType>` (more on provisioners in a
later chapter). Tasks are handled in FIFO order (more or less), so that tasks
added earliest will be executed first.

Tasks can depend on other tasks. A dependent tasks is not added to the queue
until all of the tasks it depends on have completed. Careful orchestration of
dependencies allows entire "task graphs" to be constructed, with test tasks
running only after the builds they depend on are complete.

When resources permit, we prefer to have empty queues by executing all tasks
when they are submitted to the queue. Resources, of course, do not always
permit.

## Queue Interaction Example

The following diagram illustrates the most common task interaction flow, where
a client adds a task to the queue. Then the queue publishes messages on AMQP,
and at some point an available worker claims the task, works on it and
completes it. There are obviously many other possible flows, if you consider
the provisioner and other parties listening to the AMQP exchanges.

<div class="sequence-diagram-hand">
participant Worker
participant Queue
participant RabbitMQ
participant Client

Client      ->  RabbitMQ    : Bind completed tasks
Client      ->  Queue       : Post Task
Queue       ->  RabbitMQ    : Message Pending
Worker      ->  Queue       : Claim Work
Queue       --> Worker      : Task assigned
Queue       ->  RabbitMQ    : Run started
Note over Worker : Computing...
Worker      ->  Queue       : Task completed
Queue       ->  RabbitMQ    : Task Completed
RabbitMQ    --> Client      : Task Completed
</div>

This is **just an example**, it is also possible that worker listens to RabbitMQ
exchanges for new pending messages and then claims them, instead of polling the
queue.
