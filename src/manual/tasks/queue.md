---
title: The Queue
order: 1
sequence_diagrams:  true
---

The queue, hosted at **`queue.taskcluster.net`**, is the centralized coordinator
that is responsible for accepting tasks, managing their state, and assigning
them to consumers that claim them.

---

## Queue Interaction Example

The following diagram illustrates the most common task interaction flow, where
a scheduler posts a task to the queue. Then the queue publishes messages on
AMQP, and at some point an available worker claims the task, works on it and
completes it. There are obviously many other possible flows, if you consider
the provisioner and other parties listening to the AMQP exchanges.

<div class="sequence-diagram-hand">
participant Worker
participant Queue
participant RabbitMQ
participant Scheduler

Scheduler   ->  RabbitMQ    : Bind completed tasks
Scheduler   ->  Queue       : Post Task
Queue       ->  RabbitMQ    : Message Pending
Worker      ->  Queue       : Claim Work
Queue       --> Worker      : Task assigned
Queue       ->  RabbitMQ    : Run started
Note over Worker : Computing...
Worker      ->  Queue       : Task completed
Queue       ->  RabbitMQ    : Task Completed
RabbitMQ    --> Scheduler   : Task Completed
</div>

This is **just an example**, it is also possible that worker listens to RabbitMQ
exchanges for new pending messages and then claims them, instead of polling the
queue.
