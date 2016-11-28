---
title: TaskCluster Manual
---

TaskCluster is a collection of microservices that together form a distributed
task-execution framework supporting Mozilla's continuous integration.

Most of these microservices provide REST APIs, and [accessing those
APIs](/manual/apis) is an important part of interacting with TaskCluster.
Several TaskCluster components also [watch version-control
repositories](/manual/vcs), so it is also possible to interact with TaskCluster
without ever making an API call.

In any case, TaskCluster is focused on [tasks](/manual/tasks) and on [executing
those tasks](/manual/execution) efficiently.
