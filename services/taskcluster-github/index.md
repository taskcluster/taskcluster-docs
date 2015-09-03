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
Easily trigger TaskCluster jobs based on GitHub pushes and pull requests. Tasks are defind in a YAML coniguration file which lives at the root of a repository. There is no explicit sign-up step, TaskCluster and Mozilla projects will simply begin accepting jobs as soon as a <code>.taskclusterrc</code> exists.
</p>

### A simple .taskclusterrc file
<p>
The following <code>.taskclusterrc</code> will run nodejs tests when a user opens a pull request.
</p>

```
---
version: 1                                     # a version number must be declared
tasks:                                         # we support multiple tasks
  - payload:
      image: "quay.io/mrrrgn/ubuntu-ci:0.0.1"  # some docker image
      command:                                 # each argument is a new array member
        - "/bin/bash"
        - "--login"
        - "-c"
        - "checkout-pull-request && npm install . && npm test"
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
version: 1
tasks:
  - payload:
     image: "ubuntu:latest"
     command:
       - "test"
  - extra:
      github_events:        # A list of all github events which trigger this task
        - push
```

### Task Whitelist Defaults
<p>
For security reasons, taskclusterrc jobs are whitelisted by default by user and organization. This means that a task will only be triggered by public members of the organization that own the repository. This behavior may be modified by changing the
</p>

```
---
version: 1
tasks:
  - payload:
     image: "ubuntu:latest"
     command:
       - "test"
  - extra:
      whitelist:                # An object containing whitelists
        users:                  # A list of users allowed to trigger this task
          - mrrrgn              # github user mrrrgn can now always trigger this task
          - bob.*               # ALL users with a name that starts: "bob" can trigger this task
       orgs:
         - taskcluster          # All public members of the taskcluster org can trigger this task
         - {% raw %}"{{ organization }}"{% endraw %} # All public members of the repository org can trigger this task

```

### Deadlines and the <code>{% raw %}{{ $fromNow }}{% endraw %}</code> function

A function <code>{% raw %}{{ $fromNow }}{% endraw %}</code> is included in the syntax so that users may specify consistent timeouts and deadlines. The function will accept parameters like:
<code> '1 day' </code>, <code> '3 hours' </code>, <code> '1 hour' </code>, etc...

```
---
version: 1
tasks:
  - payload:
     image: "ubuntu:latest"
     command:
       - "test"
    deadline: {% raw %}"{{ '2 hours' | $fromNow }}"{% endraw %} # the task will timeout if it doesn't complete within 2 hours
```

### Ubuntu-ci image

<p>
A basic docker image with node/npm and python/pip -- it also inculudeds a bash function <code>checkout-pull-request</code> which will automatically checkout and cd into a repo for testing some pull request which triggered a job. The container is defined at: https://github.com/taskcluster/taskcluster-github/tree/master/docker/ubuntu-ci

The ubuntu-ci is provided as a convenience, but <b>please feel free to push and use your own docker images.</b>
</p>

### Environment Variables

<p> There are environment variables available from within any TaskCluster GitHub triggered job. These are also available from within the <code>.taskclusterrc</code> file itself via curly braces.</p>

```
  GITHUB_EVENT: {% raw %}"{{ event }}"{% endraw %}                   # pull_request.opened, etc...
  GITHUB_BRANCH: {% raw %}"{{ branch }}"{% endraw %}                 # from the HEAD repo
  GITHUB_PULL_REQUEST: {% raw %}"{{ pullNumber }}"{% endraw %}       # 1, 2, 3, ..., n
  GITHUB_BASE_REPO_URL: {% raw %}"{{ baseRepoUrl }}"{% endraw %}     # https://github.com/someorg/somerepo
  GITHUB_BASE_USER: {% raw %}"{{ baseUser }}"{% endraw %}            # johndoe
  GITHUB_BASE_SHA: {% raw %}"{{ baseSha }}"{% endraw %}              # commit sha
  GITHUB_BASE_BRANCH: {% raw %}"{{ branch }}"{% endraw %}
  GITHUB_BASE_REF: {% raw %}"{{ baseRef }}"{% endraw %}
  GITHUB_HEAD_REPO_URL: {% raw %}"{{ headRepoUrl }}"{% endraw %}
  GITHUB_HEAD_USER: {% raw %}"{{ headUser }}"{% endraw %}
  GITHUB_HEAD_SHA: {% raw %}"{{ headSha }}"{% endraw %}
  GITHUB_HEAD_BRANCH: {% raw %}"{{ headBranch }}"{% endraw %}
  GITHUB_HEAD_REF: {% raw %}"{{ headRef }}"{% endraw %}
  GITHUB_HEAD_USER_EMAIL: {% raw %}"{{ headUserEmail }}"{% endraw %}
```

<div data-render-schema='http://schemas.taskcluster.net/github/v1/taskclusterrc.json'></div>
<div data-doc-ref='http://references.taskcluster.net/github/v1/api.json'></div>
<div data-doc-ref='http://references.taskcluster.net/github/v1/exchanges.json'></div>
