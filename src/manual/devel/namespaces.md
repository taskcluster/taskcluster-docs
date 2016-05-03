---
title: Namespaces
order: 2
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
 * `rust` -- Rust development + servo
 * `ateam` -- The engineering productivity team

Please file a pull request to add your project!

## Scopes

Many scopes reflect the namespaces given elsewhere in this document, as described in the API documentation for the component.

* `<component>:<action>:<details>` -
   Scopes for most API actions follow this pattern.
   For example, the `queue.defineTask` call is governed by a scope beginning with `queue:define-task:<details>`, where the details describe a hierarchy of task attributes.
   In cases where an action may be limited along any of several dimensions, each of those dimensions should be a separate scope.

* `project:<project>:…` -
   Individual projects should use scopes with this prefix.
   Projects are free to document the contained namespace in this document, link to another document, or leave it undocumented.

## Clients

Client names describe the entity making an API call.
They are used for logging and auditing, but not for access control -- all access control is performed with scopes.
ClientIds have the following forms:

 * `mozilla-ldap/<email>` -
   Clients with this name belong to users who have been authenticated against the Mozilla LDAP database.
   These are temporary credentials issued by [TaskCluster-Login](https://github.com/taskcluster/taskcluster-login).

 * `persona/<email>` -
   Clients with this name belong to users who have been authenticated by Persona, conferring a lower level of trust than Mozilla LDAP.
   These are temporary credentials issued by [TaskCluster-Login](https://github.com/taskcluster/taskcluster-login).

 * `mozilla-ldap/<email>/*`,
   `persona/<email>/*` -
   Clients with this form are managed by the user identified by the prefix.
   The portion of the name matching `*` is at the discretion of the user.

 * `<component>/*` -
   TaskCluster Platform services generate clientIds with this form.
   The service itself will generally have a clientId of `<component>`.

 * `queue/task/<taskId>/<runId>` -
   Clients of this form represent specific tasks, and are issued by the queue in the form of temporary credentials.

 * `aws-provisioner/worker/<workerGroupId>/<workerId>` -
   Clients of this form represent specific wokers, and are issued by the AWS provisioner in the form of temporary credentials.

 * `project/<project>/*` -
   Clients for a specific project have this prefix.
   Administrators for the project are granted control over this namespace, and may further subdivide it as they see fit.
   They are welcome to document those subdivisions here.

 * `garbage/*` -
   Playground for testing; clients here should not be active in the wild.
   Likewise, deleting or modifying clients with this prefix will not cause production failures.

## Roles

Most roles are defined by some kind of automatic usage in a TaskCluster component.
However, some are defined by convention.
Both are listed here:

* `client-id:<clientId>` -
   Roles with this prefix give the scopes for client credentials.
   In general, scopes should be assigned directly to clients, instead.

* `hook-id:<hookGroupId>/<hookId>` -
   Roles of this form give the scopes used to create tasks on behalf of hooks.

* `moz-tree:level:<level>` -
   Roles of this form include the basic scopes available to version-control trees at each of the three Mozilla source-code managament levels.
   They are useful as shorthand to configure `repo:*` roles.
   See [Mozilla Commit Access Policy](https://www.mozilla.org/en-US/about/governance/policies/commit/access-policy/) for information on levels.

* `mozilla-group:<groupName>` -
   Roles of this form represent the scopes available to members of the given Mozilla LDAP group via the login service.

* `mozilla-user:<userName>` -
   Roles of this form represent the scopes available to the given Mozilla LDAP user (email) via the login service.

* `mozillians-group:<groupName>` -
   Roles of this form represent the scopes available to members of the given Mozillians group via the login service.

* `mozillians-user:<userName>` -
   Roles of this form represent the scopes available to the given Mozillians user via the login service.

* `project:<project>:…` -
   Roles of this form are controlled by the corresponding project.

* `project-member:<project>` -
   Roles of this form represent the scopes accorded to members of the given project.
   This role is then be assumed by the appropriate groups.
   The scopes associated with a `project-member` role are:

   * `auth:{crud}-client:project/<project>/*` - manage project-specific clients
   * `auth:{crud}-role:project:<project>:*` - manage project-specific clients
   * `auth:{crud}-role:hook-id:project-<project>/*` - manage scopes for project-specific hooks
   * `project:<project>:*` - all project-specific scopes
   * `queue:get-artifact:project/<project/*` - create project-specific (non-public) artifacts
   * `hooks:modify-hook:project-<project>/*` - manage project-specific hooks
   * `secrets:<verb>:project/<project>/*` - manage project-specific secrets
   * `queue:route:index.project.<project>.*` - manage project routes

* `repo:<host>/<path>:branch:<branch>`,
* `repo:<host>/<path>:pull-request` -
   Roles of this form represent scopes available to version-control pushes and pull requests.

* `worker-type:<provisionerId>/<workerType>` -
   Roles of this form represent scopes available to workers of the given type.

## Artifacts

Artifacts are named objects attached to tasks, and available from the queue component.
Artifact names are, by convention, slash-separated.

* `public/…` -
   The queue allows access to any artifact that begins with `public/` without any kind of authentication.
   Public names are not further namespaced: tasks can create any public artifacts they like.
   As such, users should not assume that an artifact with this prefix was created by a known process.
   In other words, any task can create an artifact named `public/build/firefox.exe` , so do not trust such a file without verifying the trustworthiness of the task.

* `private/…` -
   Artifact names with this prefix are considered non-public, but access to them is otherwise quite broadly allowed (e.g., to all Mozilla employees, contractors and community members under NDA).
   In general, users with narrower requirements than "not public" should select a different prefix and add it to this document.

* `private/docker-worker/…` -
   Artifact names with this prefix are considered non-public, but access to them is otherwise quite broadly allowed to everybody with commit-level 1 access, regardless of NDA state.

* `project/<project>/…` -
   Artifact names with this prefix are the responsibility of the project, which may have further namespace conventions.

## Hooks

Hooks are divided into "hook groups", for which the namespace is defined here.
Within a hook group, the names are arbitrary (or defined by the project).

* `taskcluster` - hooks used internally for taskcluster maintenance
* `project-<project>` - hooks for a specific project
* `garbage` - playground for testing; hooks can be created here, but anyone can modify or delete them!

## Worker Types

Worker types are broken down into `<provisionerId>` and `<workerType>`.
Within the AWS provisioner, worker types are currently not namespaced.
All names are up for grabs -- [for now](https://bugzilla.mozilla.org/show_bug.cgi?id=1220686).

## Worker IDs

Worker IDs are broken down into `<workerGroup>` and `<workerId>`.
In the present implementation, both of these are arbitrary strings.
For workers started by the AWS provisioner, they are avaiability zone and instance ID, respectively.
For other worker types, anything goes.

## Docker-Worker Caches

Docker-worker caches are located on individual host machines, and thus may be shared among tasks with the same workerType.
The namespaces for these caches help to avoid collisions and prevent cache-poisoning attacks.

Cache names do not contain directory separators.

* `gaia-…` -
  Caches with this prefix are used by gaia builds, limited to the https://github.com/mozilla-b2g/gaia repository

* `tooltool-cache` -
  This cache contains cached downloads from tooltool.
  Since tooltool is content-addressible, and verifies hashes on files in the cache, there is no risk of cache poisoning or collisions.

* `level-<level>-<tree>-…` -
  Caches with these prefixes correspond to tasks at the corresponding SCM levels.
  See [Mozilla Commit Access Policy](https://www.mozilla.org/en-US/about/governance/policies/commit/access-policy/) for information on levels.
  The rest of this namespace is free-form and generally divided by task type, with the following common cases:

  * `level-<level>-<tree>-decision` - decision task workspace
  * `level-<level>-<tree>-tc-vcs` `level-<level>-<tree>-tc-vcs-public-sources` - taskcluster-vcs caches
  * `level-<level>-<tree>-linux-cache` - cache of `~/.cache`, containing Python packages among other things
  * `level-<level>-<tree>-build-<platform>` - workspace cache for builds for the given platform

## Secrets

Secrets provide key-value storage governed by scopes.
As such, it's very important that secrets not be unexpectedly made accessible to users who should not see them.
Secret names have the following structure:

* `garbage/<ircnick>/` -
  Secrets with this prefix are not actually secret - lots of people have access to them.
  This is a place to test out interfaces to the secrets API, but do not store anything important here.

* `project/<project>/` -
  Secrets with this prefix are the exclusive domain of the given project.
  Users not associated with a project should not be given scopes associated with the project's secrets!

* `repo:<host>/<path>:branch:<branch>`,
* `repo:<host>/<path>:pull-request` -
  Secrets within these scopes may be made available to corresponding repositories, branches, and pull requests via the corresponding roles.

## Indexes

The index provides a nice, dot-separated hierarchy of names.

* `buildbot` - the "old" index for Buildbot builds; do not use

* `funsize.v1` -
   Tasks indexed under this tree represent funsize tasks.
   These are the responsibility of the release engineering team.

* `gaia.npm_cache.<nodever>.<platform>.<revision>` -
   Tasks indexed here have generated the `node_modules` directory required for the given revision.
   These are the responsibility of teh B2G automation team.

* `garbage.<ircnick>` -
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

* `project.<project>.…` -
  Tasks indexed under this prefix are the domain of the respective project.
