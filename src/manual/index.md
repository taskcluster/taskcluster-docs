---
title: TaskCluster Manual
---

What does TaskCluster do?

Fundamentally, it executes *tasks*. A task is defined in a JSON object, and
placed on a *queue*. A *worker* later claims that task, executes it, and
updates the task with the results.

## The TaskCluster Service and Team

We provide TaskCluster as a service, rather than as an installable application.
The service is constructed as a collection of loosely-coupled microservices.
These microservices share many characteristics, making it easy to use them
together.

TaskCluster aims to be a general platform for task execution to support
software development within the Mozilla organization. It is very much a work
in progress. The current focus is to support Firefox development, without
losing the generality that will make it useful for other Mozilla projects.

TaskCluster is designed to integrate tightly with other services and
components. Some of those integrations are Mozilla-specific (for example,
Treeherder). Some integrations are maintained and provided by the TaskCluster
team, such as AWS compute resources. Others are managed separately, and may
not be available to all users -- including the compute resources assigned to
Firefox development.

## Working with TaskCluster

Most people do not need to understand everything about TaskCluster! The
[TaskCluster Tutorial](/tutorial) is designed to lead you to the information
that is most relevant to you.

The [reference section](/reference) contains documentation about the
TaskCluster services and libraries. Once you have determined the services you
need to interface with, this section can provide all of the technical detail
you need to do so successfully.  The reference section begins with a [guide to
the microservices](/reference/guide) that can help to determine the services
most relevant to your work.

The remainder of the manual is divided into major sections based on your level
of interaction with TaskCluster. [Tasks & Task Execution](/manual/tasks)
focuses on tasks, and is useful for those creating and interacting with tasks.
[Integrations](/manual/integrations) covers integration of other systems with
TaskCluster. Finally, [Development](/manual/devel) collects topics related to
development of TaskCluster itself.
