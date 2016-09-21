---
order: 0
---

# TaskCluster Operation

What does TaskCluster do?

Fundamentally, it executes *tasks*.  A task is defined in a JSON object, and
placed on a *queue*.  A *worker* later claims that task, executes it, and
updates the task with the results.

## Queues

The queue service maintains the task queues.  Task queues are named, with the
names having the form `<provisionerId>/<workerType>` (more on provisioners
below).  Tasks are handled in FIFO order (more or less), so that tasks added
earliest will be executed first.

Tasks can depend on other tasks.  A dependent tasks is not added to the queue
until all of the tasks it depends on have completed.  Careful orchestration of
dependencies allows entire "task graphs" to be constructed, with test tasks
running only after the builds they depend on are complete.

When resources permit, we prefer to have empty queues by executing all tasks
when they are submitted to the queue.  Resources, of course, do not always
permit.

## Workers and Provisioners

Workers execute tasks.  Exactly how that happens depends on the worker
implementation -- anything that follows the queue service's API can act as a
worker.  TaskCluster maintains a few worker implementations, and other groups
at Mozilla have added their own worker implementations.

The current most common worker implementation is docker-worker, which
predictably enough executes tasks in Docker containers.  However, the design of
TaskCluster is not tied to Docker - there are many other worker
implementations, too!

Workers can be managed by *provisioners*.  This is most commonly the case for
cloud-based workers.  For "fixed" workers that run continuously, there need not
be any provisioner service, although those workers will still have a
`provisionerId`.  At the moment, the AWS provisioner, which creates workers on
EC2 spot instances, is the only active provisioner.

# Working with TaskCluster

Most people do not need to understand everything about TaskCluster!  The
[TaskCluster Tutorial](/tutorial) is designed to lead you to the information
that is most relevant to you.

The [reference section](/reference) contains documentation about the
TaskCluster services and libraries.  Once you have determined the services you
need to interface with, this section can provide all of the technical detail
you need to do so successfully.
