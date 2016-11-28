---
title: TaskCluster GitHub
order: 1
---

Easily trigger TaskCluster jobs based on GitHub pushes and pull requests. Tasks
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

### A simple .taskcluster.yml file

The following `.taskcluster.yml` is used by the taskcluster-github project
itself. It will run nodejs tests when a user opens, reopens, or updates a pull
request.

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

### GitHub Events

You can modify a task definition so that it will only run for specific GitHub events, those events being:

  * `pull_request.opened`
  * `pull_request.synchronize` (a new commit is pushed)
  * `pull_request.reopened`
  * `pull_request.closed`
  * `push`                     (a push is made directly to the repo)


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

---

### A note on testing

TaskCluster GitHub *will* use `.taskcluster.yml` files from pull requests. However,
TaskCluster will not run any tasks that are not from a collaborator on a repo or a
member of an organization. This is currently in-flux and subject to change.

---

### Who Can Trigger Jobs?

For security reasons only members of the Mozilla organization and repository
collaborators can trigger TaskCluster jobs. That is, to grant permissions to
non-Mozilla org members add them to a team, and make that team a repository
collaborator. Read only permissions will suffice.

---

### Deadlines and the fromNow function

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

### Node.js image

The official Node.js docker image. More information can be found [here](https://github.com/nodejs/docker-node).

This documentation uses the Node.js image because it is convenient, but you may use any docker image you like, including one of your own design.

### Environment Variables

There are environment variables available from within any TaskCluster GitHub
triggered job with `extra: github: env: true` in its config. These are also
available from within the `.taskcluster.yml` file itself via curly braces i.e.
`{{ varname }}`.

```
  GITHUB_EVENT: "{{ event.type }}"                   # pull_request.opened, etc...
  GITHUB_BRANCH: "{{ event.base.repo.branch }}"      # from the HEAD repo
  GITHUB_PULL_REQUEST: "{{ event.pullRequest }}"     # 1, 2, 3, ..., n
  GITHUB_BASE_REPO_URL: "{{ event.base.repo.url }}"  # https://github.com/someorg/somerepo
  GITHUB_BASE_USER: "{{ event.base.user.login }}"    # johndoe
  GITHUB_BASE_SHA: "{{ event.base.sha }}"            # commit sha
  GITHUB_BASE_BRANCH: "{{ event.base.repo.branch }}"
  GITHUB_BASE_REF: "{{ event.base.ref }}"
  GITHUB_HEAD_REPO_URL: "{{ event.head.repo.url }}"
  GITHUB_HEAD_USER: "{{ event.head.user.login }}"
  GITHUB_HEAD_SHA: "{{ event.head.sha }}"
  GITHUB_HEAD_BRANCH: "{{ event.head.repo.branch }}"
  GITHUB_HEAD_REF: "{{ event.head.ref }}"
  GITHUB_HEAD_USER_EMAIL: "{{ event.head.user.email }}"
```

### Configuring TaskClusterRobot

Instructions can be found on [the usage page](https://docs.taskcluster.net/reference/core/github/docs/usage).
