---
layout:   default
class:    markdown
---

Hello, World
============

Let's start by seeing TaskCluster in action.

Visit the [Task Creator](https://tools.taskcluster/task-creator).
Before you can submit a task, you will need to log in:

 1. Click "Log In"
 1. Authenticate via Persona with an email address ending in `@mozilla.com`
 1. Click the "Grant Permission" button, returning you to the task creator

What you see in the text box is a bare-bones task description, looking something like this (the details may evolve as features are added):

    { 
      provisionerId:      'aws-provisioner-v1',
      workerType:         'b2gtest',
      created:            '2015-06-15Z12:00:00,
      deadline:           '2015-06-22Z12:00:00,
      payload: {
        image:            'ubuntu:13.10',
        command:          ['/bin/bash', '-c', 'echo "hello World"'],
        maxRunTime:       60 * 10
      },  
      metadata: {
        name:             "Example Task",
        description:      "Markdown description of **what** this task does",
        owner:            "name@example.com",
        source:           "http://tools.taskcluster.net/task-creator/"
      }
    }

Happily, this is already set up to print "hello world"!
Submit the task, and click the resulting task ID to load the task inspector while the task is scheduled and run.

The fields here are explained in greater detail throughout the rest of this documentation, but briefly:

 * `provisionerId` identifies the TaskCluster provisioner responsible for the compute resources that will execute the task.
   In this case, it is the [AWS Provisioner](/services/aws-provisioner/), which runs its tasks on Amazon EC2 instances using Docker.
 * `workerType` is a parameter specific to the AWS provisioner which identifies the pool of EC2 resources within which the task should be executed.
   Pools may use different EC2 instance types, AMIs, etc.

 * `created` and `deadline` give a time boundary for the task.
   If the task is not completed by its deadline, it will be dropped.

 * The `payload` is interpreted by the Docker worker.
   The `image` key specifies the docker image to pull, and the `command` gives the command to run within that image.

In the task inspector, you will see your task description as executed, and indications of the task's status: pending, executing, and then finished.
If you are logged in, you can re-run the same task, cancel it, etc.

The log view shows the output of the task, including that from downloading the docker image.
Scrolling all the way to the bottom, you should see the greeting output by the `echo` command.

So, that's a task!

TaskCluster at Mozilla
======================

While TaskCluster is a generic tool capable of running anywhere, at the moment it is a Mozilla-specific project.
Let's take a look at how it connects to other parts of the Mozilla ecosystem.

Treeherder
----------

Treeherder displays each job as a colored letter, regardless of how that job was executed.
The details for a job implemented as a TaskCluster task contain little more than a link to the task inspector, as seen in the previous section.
However, this is the only way to find the task id for a task run from a version-control push.

Decision Tasks and Task Graphs
------------------------------

What determines what tasks are submitted for a given version-control push?
For Gecko pushes, a TaskCluster scheduler recognizes the push and submits a "decision task".
This task is denoted with a "D" in Treeherder, and may be hidden depending on your view.
It boils down to running `mach task-graph` which submits tasks based on YAML files under `testing/taskcluster/tasks` in the source-code tree.
Thus tasks are defined in-tree, and can be developed in try and deployed directly without involvement of any other group.

The tasks for a particular push are tied together in a "task graph".
You can inspect the graph for a task by clicking the taskGraphId link in the task inspector.
Task graphs support delaying some tasks in the graph until others have finished, for example running tests once builds have completed.

Docker Images
-------------

The docker images run within the docker-worker on Amazon EC2 instances are also defined in-tree, under `testing/docker`.
The images are not (currently) built automatically, but after a manual build it is entirely possible to run a task against a customized image.

External Links
--------------
 * ["TaskCluster Hello World" video by mrrrgn and dustin](https://vreplay.mozilla.com/replay/showRecordingExternal.html?key=7AvN2iczQYcI3lY)
