---
title: TaskCluster GitHub
order: 40
---

Easily trigger TaskCluster jobs based on GitHub pushes, pull requests and releases. Tasks
are defined in a YAML configuration file which lives at the root of a
repository. There is no explicit sign-up step, TaskCluster and Mozilla projects
will simply begin accepting jobs as soon as a `.taskcluster.yml` exists.
However, annotating pull requests with the status of TaskCluster jobs does
require the configuration step described in _Configuring TaskClusterRobot_ below.

*Note: for PR status reporting to work properly, you need to add
[TaskClusterRobot](https://github.com/TaskClusterRobot) to the contributors
(read/write) for your repository. [Instructions](https://docs.taskcluster.net/reference/core/github/docs/usage)*

The syntax is somewhat verbose, but offers an enormous amount of flexibility.
The eventual goal of this project is to support all platforms and allow users
to define workflows for testing, shipping, and landing patches from within
their configurations.

## A simple .taskcluster.yml file

The following `.taskcluster.yml` is used by the taskcluster-github project
itself. It will run nodejs tests when a user opens, reopens or updates a pull request.

```
# The version is always required
version: 0
# Top level metadata is always required
metadata:
  name: "TaskCluster GitHub Tests"
  description: "All non-integration tests for taskcluster github"
  owner: "{{ event.head.user.email }}" # the user who sent the pr/push e-mail will be inserted here
  source: "{{ event.head.repo.url }}"  # the repo where the pr came from will be inserted here
tasks:
  # What kind of environment will you need (docker, windows, etc...)
  - provisionerId: "{{ taskcluster.docker.provisionerId }}"
    # Be careful with spacing under the lines with dashes. Next line should begin under the word, not under the dash.
    # Worker types correspond to particular machine types (aws size, etc...)
    # worker types may be added by priveleged taskcluster users at https://tools.taskcluster.net/aws-provisioner
    workerType: "{{ taskcluster.docker.workerType }}"
    extra:
      github:
        # This must be set in order access GitHub info from inside your environment
        env: true
        # Events that will trigger this task
        events:
          - pull_request.opened
          - pull_request.synchronize
          - pull_request.reopened
    payload:
      maxRunTime: 3600                          # Job timeout, in seconds
      image: "node:5"                           # Official Node.js docker container (if using docker)
      command:                                  # A command to run, list entries are arguments
        - "/bin/bash"
        - "--login"
        - "-c"
        - "git clone {{event.head.repo.url}} repo && cd repo && git checkout {{event.head.sha}} && npm install . && npm test"
    # Each task also requires explicit metadata
    metadata:
      name: "TaskCluster GitHub Tests"
      description: "All non-integration tests"
      owner: "{{ event.head.user.email }}"
      source: "{{ event.head.repo.url }}"
```

## GitHub Events

You can modify a task definition so that it will only run for specific GitHub events, those events being:

  * `pull_request.opened`
  * `pull_request.synchronize` (a new commit is pushed)
  * `pull_request.reopened`
  * `pull_request.closed`
  * `push`                     (a push is made directly to the repo)
  * `release`                  (a new tag or release published in any branch of the repo)


```
---
version: 0
tasks:
  - payload:
     maxRunTime: 3600
     image: "node:<version>"
     command:
       - "test"
    extra:
      github:
        events:        # A list of all github events which trigger this task
          - push
```

Remember that clone command for a release somewhat differs, so if you need to clone the tag instead of the whole repository, it makes sense to have a separate tasks set defined just for the release event. You'll find the example of the clone command below.

```
---
version: 0
tasks:
  - payload:
     maxRunTime: 3600
     image: "node:<version>"
     command:
        - "/bin/bash"
        - "--login"
        - "-c"
        - "git clone -b {{ event.version }} {{ event.head.repo.url }} repo && cd repo && npm install . && npm test"
    extra:
      github:
        events:        # A list of all github events which trigger this task
          - release
```

---

### Branch Filtering

You can also modify a task definition so that it will only run for events on certain branches. For example, the task defined below will only run for pushes to the master branch:

```
---
version: 0
tasks:
  - payload:
     maxRunTime: 3600
     image: "node:<version>"
     command:
       - "test"
    extra:
      github:
        events:        # A list of all github events which trigger this task
          - push
        branches:
          - master
```
Branch filtering doesn't work for releases.

---

## A note on testing

TaskCluster GitHub *will* use `.taskcluster.yml` files from pull requests. However,
TaskCluster will not run any tasks that are not from a collaborator on a repo or a
member of an organization. This is currently in-flux and subject to change.

---

## Who Can Trigger Jobs?

For security reasons only members of the Mozilla organization and repository
collaborators can trigger TaskCluster jobs. That is, to grant permissions to
non-Mozilla org members add them to a team, and make that team a repository
collaborator. Read only permissions will suffice.

---

## Deadlines and the fromNow function

A function `{{ $fromNow }}` is included in the syntax so that users may specify
consistent timeouts and deadlines. The function will accept parameters like:
`'1 day'`, `'3 hours'`, `'1 hour'`, etc.

```
---
version: 0
tasks:
  - payload:
      maxRunTime: 3600
      image: "node:<version>"
      command:
        - "test"
    deadline: "{{ '2 hours' | $fromNow }}" # the task will timeout if it doesn't complete within 2 hours
```

## Node.js image

The official Node.js docker image. More information can be found [here](https://github.com/nodejs/docker-node).

This documentation uses the Node.js image because it is convenient, but you may use any docker image you like, including one of your own design.

## Token Substitution and Environment Variables

The following tables list curly brace tokens (`{{ tokenName }}`) that can be
included in your `.taskcluster.yml` file which will be substituted at task
generation time.

In addition to these token substitutions, by setting `extra.github.env` to
`true` in `.taskcluster.yml`, your generated tasks will also include additional
environment variables with `GITHUB_` prefix. If these environment variables are
not required (i.e. you only require token substitutions) then you do not need
to set `extra.github.env`. These environment variables are also listed in the
tables below, where they occur. Currently not all token substituions are
available as environment variables (notably, the release metadata).

### Pull Request Metadata

```
  Environment Variable   | Token Placeholder              | Example Value(s)
  -----------------------+--------------------------------+-----------------------------------------
  GITHUB_EVENT           | "{{ event.type }}"             | pull_request.assigned
                         |                                | pull_request.unassigned
                         |                                | pull_request.labeled
                         |                                | pull_request.unlabeled
                         |                                | pull_request.opened
                         |                                | pull_request.edited
                         |                                | pull_request.closed
                         |                                | pull_request.reopened
                         |                                |
  GITHUB_PULL_REQUEST    | "{{ event.pullNumber }}"       | 18
  GITHUB_BRANCH          | "{{ event.head.repo.branch }}" | master
                         |                                |
  GITHUB_BASE_USER       | "{{ event.base.user.login }}"  | johndoe
  GITHUB_BASE_REPO_NAME  | "{{ event.base.repo.name }}"   | somerepo
  GITHUB_BASE_REPO_URL   | "{{ event.base.repo.url }}"    | https://github.com/johndoe/somerepo
  GITHUB_BASE_SHA        | "{{ event.base.sha }}"         | ee6a2fc800cdab6a98bf24b5af1cd34bf36d41ec
  GITHUB_BASE_BRANCH     | "{{ event.base.repo.branch }}" | master
  GITHUB_BASE_REF        | "{{ event.base.ref }}"         | refs/heads/master
                         |                                |
  GITHUB_HEAD_USER       | "{{ event.head.user.login }}"  | maryscott
  GITHUB_HEAD_REPO_NAME  | "{{ event.head.repo.name }}"   | somerepo
  GITHUB_HEAD_REPO_URL   | "{{ event.head.repo.url }}"    | https://github.com/maryscott/somerepo
  GITHUB_HEAD_SHA        | "{{ event.head.sha }}"         | e8f57659c7400e225d2f70f8d17ed11b7f914abb
  GITHUB_HEAD_BRANCH     | "{{ event.head.repo.branch }}" | bug1394856
  GITHUB_HEAD_REF        | "{{ event.head.ref }}"         | refs/heads/bug1394856
  GITHUB_HEAD_USER_EMAIL | "{{ event.head.user.email }}"  | mary.scott@buccleuch.co.uk
```

### Push Metadata

```
  Environment Variable   | Token Placeholder              | Example Value
  -----------------------+--------------------------------+-----------------------------------------
  GITHUB_EVENT           | "{{ event.type }}"             | push
  GITHUB_BRANCH          | "{{ event.base.repo.branch }}" | bug1394856
                         |                                |
  GITHUB_BASE_USER       | "{{ event.base.user.login }}"  | maryscott
  GITHUB_BASE_REPO_NAME  | "{{ event.base.repo.name }}"   | somerepo
  GITHUB_BASE_REPO_URL   | "{{ event.base.repo.url }}"    | https://github.com/maryscott/somerepo
  GITHUB_BASE_SHA        | "{{ event.base.sha }}"         | ee6a2fc800cdab6a98bf24b5af1cd34bf36d41ec
  GITHUB_BASE_BRANCH     | "{{ event.base.repo.branch }}" | bug1394856
  GITHUB_BASE_REF        | "{{ event.base.ref }}"         | refs/heads/bug1394856
                         |                                |
  GITHUB_HEAD_USER       | "{{ event.head.user.login }}"  | maryscott
  GITHUB_HEAD_REPO_NAME  | "{{ event.head.repo.name }}"   | somerepo
  GITHUB_HEAD_REPO_URL   | "{{ event.head.repo.url }}"    | https://github.com/maryscott/somerepo
  GITHUB_HEAD_SHA        | "{{ event.head.sha }}"         | e8f57659c7400e225d2f70f8d17ed11b7f914abb
  GITHUB_HEAD_BRANCH     | "{{ event.head.repo.branch }}" | bug1394856
  GITHUB_HEAD_REF        | "{{ event.head.ref }}"         | refs/heads/bug1394856
  GITHUB_HEAD_USER_EMAIL | "{{ event.head.user.email }}"  | mary.scott@buccleuch.co.uk
```

### Release Metadata

```
  Environment Variable   | Token Placeholder              | Example Value
  -----------------------+--------------------------------+-------------------------------------------------------------------------
  GITHUB_EVENT           | "{{ event.type }}"             | release
  GITHUB_BRANCH          | "{{ event.base.repo.branch }}" | master
                         |                                |
  GITHUB_HEAD_USER       | "{{ event.head.user.login }}"  | maryscott
  GITHUB_HEAD_REPO_NAME  | "{{ event.head.repo.name }}"   | somerepo
  GITHUB_HEAD_REPO_URL   | "{{ event.head.repo.url }}"    | https://github.com/maryscott/somerepo
                         |                                |
                         | "{{ event.version }}"          | v1.0.3 (tag name)
                         | "{{ event.name }}"             | null
                         | "{{ event.release.url }}"      | https://api.github.com/repos/taskcluster/generic-worker/releases/5108386
                         | "{{ event.prerelease }}"       | false
                         | "{{ event.draft }}"            | false
                         | "{{ event.tar }}"              | https://api.github.com/repos/taskcluster/generic-worker/tarball/v7.2.6
                         | "{{ event.zip }}"              | https://api.github.com/repos/taskcluster/generic-worker/zipball/v7.2.6
```

### Configuring TaskClusterRobot

Instructions can be found on [the usage page](https://docs.taskcluster.net/reference/core/github/docs/usage).
