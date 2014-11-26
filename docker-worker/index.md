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
