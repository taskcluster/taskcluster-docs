---
layout:       default
class:        markdown
docson:       true
---

# Docker Worker

This worker is designed to handle tasks on linix via
[docker](http://www.docker.com/).

The worker being based on docker allows you to execute just about any task that
runs on linux in a portable fashion (i.e you can run it locally, on another CI
system, etc...) with none to minimal taskcluster specifics built into your images.

## Queue `.payload` schema

<div data-render-schema="http://schemas.taskcluster.net/docker-worker/v1/payload.json"></div>


## Environment

In addition to any environment (env) variables given we also provide every
docker-worker task with the following environment variables these are mandatory
and override any task provided values.

    - `TASK_ID` : The current task id.
    - `RUN_ID` : The current run id for the task.

Note that environment variables can also be used in the `command` field.

```json
{
  "command": ["/bin/bash", "-c", "curl https://queue.taskcluster.net/v1/task/$TASK_ID"]
}
```

## Services

Services allow a task to utilize (and "link") with other docker images.

One common use case is mounting a database or other network accessible services
(rabbitmq, etc...) or mozilla services which have been dockerized for local
testing (marketplace, etc..).

A more powerful and complex use case is using services to contain sensitive or
otherwise locked down services behind public apis. For example one could embed
credentials (be very sure you know what your doing and any baked in credentials
are minimal) in the docker image then expose an api for an untrusted source
(like a try job) to interact with the service.
