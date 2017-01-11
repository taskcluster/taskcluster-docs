---
title: Docker Worker
order: 1
docson: true
---

This worker is designed to handle tasks on linux via
[docker](http://www.docker.com/).

Docker allows you to execute just about any task that runs on Linux in a portable fashion, in whatever system image you like.
More importantly, that system image can be specified *in the task definition*.

## Example

The following is a simple docker-worker task (in fact, it is similar to the task used in the [tutorial](/tutorial):

```
{
	"provisionerId": "aws-provisioner-v1",
	"workerType": "tutorial",
	"created": "..",
	"deadline": "..",
	"payload": {
		"image": "ubuntu:latest",
		"command": [
			"/bin/bash",
			"-c",
			"echo \"hello World\""
		],
		"maxRunTime": 600
	},
	"metadata": {
		"name": "Example Task",
		"description": "Markdown description of **what** this task does",
		"owner": "name@example.com",
		"source": "https://tools.taskcluster.net/task-creator/"
	}
}
```

The `tutorial` workerType in the AWS provisioner is configured to run docker-worker in AWS EC2 spot instances.
When this task is created, it is put on a queue.
One of these docker-worker instances pulls the task from the queue.
It downloads the named docker image (`ubuntu:latest`), and runs the command in that image.

For more details about docker worker, see the [reference section](/reference/workers/docker-worker).
