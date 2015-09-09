---
layout:       default
class:        html
docson:       true
marked:       true
ejs:          true
superagent:   true
docref:       true
---

<h1>TaskCluster GitHub</h1>
<p>
Easily trigger TaskCluster jobs based on GitHub pushes and pull requests. Tasks are defined in a YAML coniguration file which lives at the root of a repository. There is no explicit sign-up step, TaskCluster and Mozilla projects will simply begin accepting jobs as soon as a <code>.taskcluster.yml</code> exists.
</p>
<p>
The syntax is somewhat verbose, but offers an enormous amount of flexibility. The eventual goal of this project is to support all platforms and allow users to define workflows for testing, shipping, and landing patches from within their configurations.
</p>

### A simple .taskcluster.yml file
<p>
The following <code>.taskcluster.yml</code> is used by the taskcluster-github project itself. It will run nodejs tests when a user opens, reopens, or updates a pull request.
</p>

```
# The version is always required
version: 0
# Top level metadata is always required
metadata:
  name: "TaskCluster GitHub Tests"
  description: "All non-integration tests for taskcluster github"
  owner: "{% raw %}{{ event.head.user.email }}{% endraw %}"
  source: "{% raw %}{{ event.head.repo.url }}{% endraw %}"
tasks:
  # What kind of environment will you need (docker, windows, etc...)
  - provisionerId: "{% raw %}{{ taskcluster.docker.provisionerId }}{% endraw %}"
  # Worker types correspond to particular machine types (aws size, etc...)
    workerType: "{% raw %}{{ taskcluster.docker.workerType }}{% endraw %}"
    extra:
      github:
        # This must be set in order access GitHub info from inside your environment
        env: true
        # Events that will trigger this job to run
        events:
          - pull_request.opened
          - pull_request.synchronize
          - pull_request.reopened
    payload:
      maxRunTime: 3600                          # Job timeout, in seconds
      image: "quay.io/mrrrgn/ubuntu-ci:0.0.1"   # Our docker container (if using docker)
      command:                                  # A command to run, list entries are arguments
        - "/bin/bash"
        - "--login"
        - "-c"
        - "checkout-pull-request && npm install . && npm test"
    # Each task also requires explicit metadata
    metadata:
      name: "TaskCluster GitHub Tests"
      description: "All non-integration tests"
      owner: "{% raw %}{{ event.head.user.email }}{% endraw %}"
      source: "{% raw %}{{ event.head.repo.url }}{% endraw %}"
```

### GitHub Events

You can modify a task definition so that it will only run for specific GitHub events, those events being:

  * pull_request.opened
  * pull_request.synchronize # a new commit is pushed
  * pull_request.reopened
  * pull_request.closed
  * push                     # a push is made directly to the repo


```
---
version: 0

...

tasks:
  - payload:
     maxRunTime: 3600
     image: "ubuntu:latest"
     command:
       - "test"
    extra:
      github:
        events:        # A list of all github events which trigger this task
          - push
```

### Who Can Trigger Jobs?
<p>
For security reasons only members of the Mozilla organization and repository collaborators can trigger taskcluster jobs. That is, to grant permissions to non-mozilla org members add them to a team, and make that team a repository collaborator. Read only permissions will suffice.

In the future it will be possible to trigger jobs for any pull request by leaving a specially formatted comment (e.g. "TCGH Run <job_name>")
</p>

### Deadlines and the <code>{% raw %}{{ $fromNow }}{% endraw %}</code> function

A function <code>{% raw %}{{ $fromNow }}{% endraw %}</code> is included in the syntax so that users may specify consistent timeouts and deadlines. The function will accept parameters like:
<code> '1 day' </code>, <code> '3 hours' </code>, <code> '1 hour' </code>, etc...

```
---
version: 0

...

tasks:
  - payload:
     maxRunTime: 3600
     image: "ubuntu:latest"
     command:
       - "test"
    deadline: {% raw %}"{{ '2 hours' | $fromNow }}"{% endraw %} # the task will timeout if it doesn't complete within 2 hours
```

### Ubuntu-ci image

<p>
A basic docker image with git, node/npm, and python/pip installed. It also includes a bash function <code>checkout-pull-request</code> which will automatically checkout and cd into a repo for testing some pull request which triggered a job. The container is defined at: https://github.com/taskcluster/taskcluster-github/tree/master/docker/ubuntu-ci and may be pulled from <code>quay.io/mrrrgn/ubuntu-ci:latest</code>.

The ubuntu-ci image is provided as a convenience, but <b>please feel free to push and use your own docker images.</b>
</p>

### Environment Variables

<p> There are environment variables available from within any TaskCluster GitHub triggered job with <code>extra: github: env: true</code> in its config. These are also available from within the <code>.taskcluster.yml</code> file itself via curly braces i.e. {% raw %}{{ varname }}{% endraw %}.</p>

```
  GITHUB_EVENT: {% raw %}"{{ event.type }}"{% endraw %}                   # pull_request.opened, etc...
  GITHUB_BRANCH: {% raw %}"{{ event.base.repo.branch }}"{% endraw %}      # from the HEAD repo
  GITHUB_PULL_REQUEST: {% raw %}"{{ event.pullRequest }}"{% endraw %}     # 1, 2, 3, ..., n
  GITHUB_BASE_REPO_URL: {% raw %}"{{ event.base.repo.url }}"{% endraw %}  # https://github.com/someorg/somerepo
  GITHUB_BASE_USER: {% raw %}"{{ event.base.user.login }}"{% endraw %}    # johndoe
  GITHUB_BASE_SHA: {% raw %}"{{ event.base.sha }}"{% endraw %}            # commit sha
  GITHUB_BASE_BRANCH: {% raw %}"{{ event.base.repo.branch }}"{% endraw %}
  GITHUB_BASE_REF: {% raw %}"{{ event.base.ref }}"{% endraw %}
  GITHUB_HEAD_REPO_URL: {% raw %}"{{ event.head.repo.url }}"{% endraw %}
  GITHUB_HEAD_USER: {% raw %}"{{ event.head.user.login }}"{% endraw %}
  GITHUB_HEAD_SHA: {% raw %}"{{ event.head.sha }}"{% endraw %}
  GITHUB_HEAD_BRANCH: {% raw %}"{{ event.head.repo.branch }}"{% endraw %}
  GITHUB_HEAD_REF: {% raw %}"{{ event.head.ref }}"{% endraw %}
  GITHUB_HEAD_USER_EMAIL: {% raw %}"{{ event.head.user.email }}"{% endraw %}
```

<div data-render-schema='http://schemas.taskcluster.net/github/v1/taskcluster-github-config.json'></div>
<div data-doc-ref='http://references.taskcluster.net/github/v1/api.json'></div>
<div data-doc-ref='http://references.taskcluster.net/github/v1/exchanges.json'></div>
