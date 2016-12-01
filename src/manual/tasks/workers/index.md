---
title: Workers
order: 20
---

## Getting Work Done

Workers execute tasks.  They consume tasks from the queue service, perform
them, and report results.

Any software that knows how to [interact with the queue's
API](/manual/tasks/worker-interaction) can act as a worker.  For example a
program run manually once by a user on a physical smartphone to perform a task
pulled from the queue would constitute a worker.  TaskCluster maintains a few
worker implementations, and other groups at Mozilla have added their own worker
implementations. 

Typically workers are implemented as daemons running on dedicated instances in
the cloud. Ae such, they have no REST API -- that is, there is no "worker
service".

The current most common worker implementation is docker-worker, which
predictably enough executes tasks in Docker containers. However, it is
important to note that the design of TaskCluster is not tied to Docker - there
are many other worker implementations, too!

## Provisioning

Workers can optionally be managed by *provisioners*. This is most commonly the
case for cloud-based workers. For "fixed" workers that run continuously, there
need not be any provisioner service, although those workers will still have a
`provisionerId`. At the moment, the AWS provisioner, which creates workers on
EC2 spot instances, is the only active cloud provisioner.

The TaskCluster Queue does _not_ require any configuration or programmatic
changes in order to start supporting a new worker.  A task defines which
`provisionerId` and `workerType` it requires, as arbitrary string fields. So
long as a worker successfully authenticates requests to the Queue, and makes
claims against the given `provisionerId` and `workerType` combination, the
Queue will cooperate by providing Task information, and assigning tasks to the
worker. This means no Queue downtime for the roll out of a new worker. It also
means one-off workers can be written for one-off jobs, if required.

For the interaction between workers and the Queue, see [Queue - Worker
Interaction](/manual/tasks/worker-interaction).

TaskCluster includes a few worker implementations, described in the following
subsections.  Some other users of TaskCluster provide worker implementations as
well, but those are not documented here.
