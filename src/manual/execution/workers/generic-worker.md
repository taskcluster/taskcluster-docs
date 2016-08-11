---
title: Generic Worker
order: 2
docson:       true
---

# Generic Worker

The generic worker was our first worker that was intended for non-linux
environments. In theory it can run against any platform which supports the go
programming language, however in practice we use it currently only for
Windows™, and the generic worker will be soon superceded by the TaskCluster
Worker.

If you are looking at standing up new jobs, we recommend you take a look at the
TaskCluster Worker, which is intended to eventually replace the Generic Worker.

## Generic Worker payload definition

When submitting a task graph to the Task Cluster scheduler (see
[createTaskGraph](/reference/platform/scheduler/api-docs#createTaskGraph)) you must provide a
payload for defining the tasks to be executed by the worker. In the case of the
generic worker, the payload must conform to the following schema.

<div data-render-schema="http://schemas.taskcluster.net/generic-worker/v1/payload.json"></div>

The payload comprises of a command to run, environment variables to be set
(optionally encrypted) and a timeout for the task (`maxTimeRun`).

The worker will run the task, upload log files, and report back status to the
Queue.

## Building Firefox Desktop for Windows

Please see [Building Firefox for Windows™ on Try using
TaskCluster](http://petemoore.github.io/general/taskcluster/2015/09/30/building-firefox-for-windows-on-try-using-taskcluster.html)
for a practical walkthrough of using the Generic Worker for building Firefox
Desktop for Windows™.
