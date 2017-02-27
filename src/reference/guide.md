---
title: Guide to The Microservices
order: 1
---

TaskCluster is composed of a lot of loosely-coupled microservices.
While this has lots of well-known advantages as a system architecture, the drawback is that it can be rather difficult for a non-expert to figure out where to start!
This guide aims to summarize the available services and their interconnections, in hope of helping you narrow down your search.

## Platform vs. Core

TaskCluster aims to be a general platform for task execution to support software development within the Mozilla organization.
While it is not currently practical to deploy TaskCluster outside of the installation at Mozilla, enabling such deployments is a long-term design goal.
To that end, the services are divided broadly into [platform](platform) and [core](core).

Platform services are services that any deployment of TaskCluster would include, and on which other TaskCluster components freely depend.
For example, there's no TaskCluster without a [queue](platform/queue) to hold tasks, or without an [authentication service](platform/auth) to control access to APIs.

Core services are not essential, but still aim to provide general functionality.
For example, despite its utility at Mozilla, an deployment of TaskCluster could conceivably be done without the [secrets service](core/secrets).

## External Services

TaskCluster depends heavily on [Pulse](https://pulseguardian.mozilla.org/), which is a Mozilla-wide AMQP message bus.
The TaskCluster team provides some useful libraries and related API methods, but does not operate the pulse service.

## TaskCluster Platform

The [authentication service](platform/auth) provides methods for other TaskCluster services to authenticate API requests, so it implements most of the functionality in ["Using the APIs"](/manual/integrations/apis).
It also provides functionality to get short-term credentials for other services such as Amazon S3 or Azure SAS.
This functionality allows users and services to be provisioned with a simple set of TaskCluster credentials and dynamically acquire all of the other access from those credentials.

The [queue service](platform/queue) is the focus of all task management in Taskcluster.
It provides API methods for creating new tasks, examining existing tasks, and for executing tasks (used by workers).
It also provides an extensive set of pulse messages that describe changes in task status.

## TaskCluster Core

### Utility Services

The [index service](core/index) provides a way to index tasks efficiently using dot-separated namespaces.
With careful design of these namespaces, it is easy to look up completed tasks of particular types and to find the artifacts those tasks created.
The [hooks service](core/hooks) supports execution of tasks at specific times or in response to external events.
The [secrets service](core/secrets) provides a scope-protected store for secret data that can be made available selectively to tasks or other users.
The [taskcluster-notify service](core/taskcluster-notify) handles sending notifications to users via email, irc, etc.

### Workers

TaskCluster allows a great deal of flexibility in task execution, so the available options for workers are many.

The project provides several implementations of workers.
[Docker-worker](workers/docker-worker) runs tasks on Linux in docker containers.
[Generic-worker](workers/generic-worker) runs tasks witout containers, and has thorough support for Windows.
[Taskcluster-worker](workers/taskcluster-worker) aims to be the single implementation that is used everywhere, sporting "engines" for specific circumstances.

Other users of TaskCluster have built worker implementations as well.
For example, release engineering has built "scriptworker" which can execute tasks using predefined scripts for higher security.

Workers can run on any host with Internet access - simply install and configure a worker with appropriate credentials.
Cloud computing platforms are an obvious choice for most task executioni.
The [AWS provisioner](integrations/aws-provisioner) provides a mechanism to start Amazon EC2 instances as needed.

### External Integrations

The [taskcluster-github service](integrations/github) integrates with Github, supporting creation of tasks in response to pushes, pull requests, and so on; and updates status indications in Github to represent the results of those tasks.

Within Mozilla, the *mozilla-taskcluster service* monitors pushes to https://hg.mozilla.org and creates tasks for them.
It does not handle task status, though -- that is the business of the [taskcluster-treeherder](integrations/treeherder) service, which relays task results to [Treeherder](https://treeherder.mozilla.org).

The [taskcluster-pulse service](integrations/taskcluster-pulse) provides temporary Pulse credentials for consuming or publishing Pulse messages.
It functions like the auth service in that it allows applications to be configured with TaskCluster credentials only but still have managed access to Pulse.

The [cloud-mirror service](integrations/cloud-mirror) automatically copies task artifacts between cloud-storage regions to ensure that data close to where it is required.

### Team Operations

These services are useful to the TaskCluster team, but probably not as useful to TaskCluster users!

The [statsum service](operations/statsum) handles generic, statstically sound aggregation of system metrics.
The [stats-collector service](operations/stats-collector) performs some very purpose-specific calculations to help the team measure the system against its defined service levels.
The [diagnostics service](operations/diagnostics) service performs end-to-end diagnostic tests of the TaskCluster system to detect errors.

### Tools Interface

The [tools site](https://tools.taskcluster.net/) provides an extensive UI for interacting with TaskCluser services.
While the site itself is a static React application, it makes use of several services for its dynamic behavior.
The [login service](integrations/login) provides a way for users to get TaskCluster credentials.
The [events service](core/events) connects the web browser to Pulse.
And the [cors-proxy](core/cors-proxy) service enables secure access to external CORS-protected services.
