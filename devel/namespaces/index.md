---
layout:   default
class:    markdown
---

Namespaces
==========

TaskCluster has a number of namespaces defined to allow multiple users to get along without interfering with one another.
The platform itself is agnostic to the structure of these namespaces, but infrastructure that interacts with the platform is dependent on the namespaces for security and correctness.

This document necessarily contains information that is specific to users of the TaskCluster platform.
As such, it is open to contributions from all users who wish to carve out a section of a namespace -- just [submit a pull request](https://github.com/taskcluster/taskcluster-docs).

## Projects

Most work at Mozilla falls into "projects", and these provide a nice organizational boundary for controlling access.
We use a consistent name for each project in the various namespaces below -- something simple and without punctuation.
The known projects are:

 * `taskcluster` -- The taskcluster platform itself
 * `releng` -- Mozilla release engineering (build, test, and release processes)
 * `gaia` -- B2G/Firefox OS build system
 * `bmo` -- bugzilla.mozilla.org development

Please file a pull request to add your project!

## Scopes

Many scopes reflect the namespaces given elsewhere in this document, as described in the API documentation for the component.

* `<component>:<verb>:` -
   Scopes for most API actions have a prefix like this.
   For example, the `queue.createTask` call is governed by a scope beginning with `queue:create-task:`.

* `buildbot-bridge:`
   The release engineering team's buildbot bridge (BBB) uses scopes with this prefix.

* `project:<project>:`
   Individual projects should use scopes with this prefix.

* `signing:`
   The release engineering team's signing system uses scopes with this prefix.

## Roles

Most roles are defined by some kind of automatic usage in a TaskCluster component.
However, some are defined by convention.
Both are listed here:

* `client-id:<clientId>` -
   Roles with this prefix give the scopes for client credentials.

* `hook-id:<hookGroupId>/<hookId>` -
   Roles of this form give the scopes used to create tasks on behalf of hooks.

* `mozilla-group:<groupName>` -
   Roles of this form represent the scopes available to members of the given Mozilla LDAP group via the login service.

* `mozilla-user:<userName>` -
   Roles of this form represent the scopes available to the given Mozilla LDAP user via the login service.

* `repo:<host>/<path>:branch:<branch>`,
* `repo:<host>/<path>:pull-request` -
   Roles of this form represent scopes available to version-control pushes and pull requests.

* `moz-tree:level:<level>`
   Roles of this form include the basic scopes available to version-control trees at each of the three Mozilla source-code managament levels.
   They are useful as shorthand to configure `repo:*` roles.
   See [Mozilla Commit Access Policy](https://www.mozilla.org/en-US/about/governance/policies/commit/access-policy/) for information on levels.

* `scheduler-id:<schedulerId>/<taskGroupId>` -
   Roles of this form represent scopes available to schedulers with the given ID.

* `worker-id:<workerGroup>/<workerId>` -
   Roles of this form represent scopes available to workers with the given ID.

* `worker-type:<provisionerId>/<workerType>` -
   Roles of this form represent scopes available to workers of the given type.

## Artifacts

Artifacts are named objects attached to tasks, and available from the queue component.
Artifact names are, by convention, slash-separated.

* `public/` -
   The queue allows access to any artifact that begins with `public/` without any kind of authentication.
   Such public names are not further namespaced: tasks can create any public artifacts they like.

* `private/` -
   Artifact names with this prefix are considered non-public, but access to them is otherwise quite broadly allowed (e.g., to all Mozilla employees).
   In general, users with narrower requirements than "not public" should select a different prefix and add it to this document.

* `index/` -
   Artifact names with this prefix follow the index namespace, replacing the `.` separators with `/`.
   For example, a task that indexes artifacts under `gaia.npm_cache.node-v4-2.linux-x64` would name its artifacts with the prefix `index/gaia/npm_cache/node-v4_2/linux-x64`.
   Scopes for creating and reading such artifacts should follow the ownership hierarchy of the index routes.

* `project/<project>/` -
   Artifact names with this prefix are the responsibility of the project, which may have further namespace conventions.

## Hooks

Hooks are divided into "hook groups", for which the namespace is defined here.
Within a hook group, the names are arbitrary (or defined by the project).

* `project:<project>` - hooks for a speceific project

## Worker Types

Worker types are broken down into `<provisionerId>` and `<workerType>`.
Within the AWS provisioner, worker types are currently not namespaced.
All names are up for grabs -- [for now](https://bugzilla.mozilla.org/show_bug.cgi?id=1220686).

## Worker IDs

Worker IDs are broken down into `<workerGroup>` and `<workerId>`.
In the present implementation, both of these are arbitrary strings.
For workers started by the AWS provisioner, they are avaiability zone and instance ID, respectively.
For other worker types, anything goes.

## Caches

Caches are not namespaced, but they [should be](https://bugzilla.mozilla.org/show_bug.cgi?id=1220684).

## Secrets

Secrets provide key-value storage governed by scopes.
As such, it's very important that secrets not be unexpectedly made accessible to users who should not see them.
Secret names have the following structure:

* `project/<project>/` -
  Secrets with this prefix are the exclusive domain of the given project.
  Users not associated with a project should not be given scopes associated with the project's secrets!

## Routes

TODO

## Indexes

The index provides a nice, dot-separated hierarchy of names.

* `buildbot` - the "old" index for Buildbot builds; do not use

* `funsize.v1` -
   Tasks indexed under this tree represent funsize tasks.
   These are the responsibility of the release engineering team.

* `gaia.npm_cache.<nodever>.<platform>.<revision>` -
   Tasks indexed here have generated the `node_modules` directory required for the given revision.
   These are the responsibility of teh B2G automation team.

* `garbage` -
   Anything goes under this index path.
   Use this for development and experimentation.

* `gecko.v1` - another "old" index for builds; do not use

* `gecko.v2.<tree>.revision.<revision>.<platform>.<build>`,
* `gecko.v2.<tree>.latest.<platform>.<build>` -
   Index for Gecko build jobs, either by revision or for the latest job with the given platform and build.
   These are the responsibility of the release engineering team.

* `tc-vcs.v1` -
   Tasks indexed under this prefix represent caches used by the TaskCluster VCS tool to avoid crushing version-control hosts.
   These are the responsibility of the taskcluster team.
