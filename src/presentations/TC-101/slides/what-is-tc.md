### What is TaskCluster?

 TaskCluster is a task execution platform.
 You can:

 * Run any command in a container.
 * Configure and install software you need.
 * Run the task exec environment locally.





---


You can run a task right now in our task-creator:

https://tools.taskcluster.net/introduction/getting-started/
<br/>(you need to authenticate with a mozilla.com address)







---






### Anatomy of a task

A simple task:

```
{
  provisionerId:      'aws-provisioner-v1',
  workerType:         'tutorial',
  created:            '2015-06-15Z12:00:00,
  deadline:           '2015-06-22Z12:00:00,
  payload: {
    image:            'ubuntu:13.10',
    command:          ['/bin/bash', '-c', 'echo "hello World"'],
    maxRunTime:       60 * 10
  },
  metadata: {
    name:             "Example Task",
    description:      "Markdown description of **what** this task does",
    owner:            "name@example.com",
    source:           "http://tools.taskcluster.net/task-creator/"
  }
}
```






---


### Tasks live in tree!




We made an intentional choice to move this configuration to the code:

```
testing/taskcluster/*

```

We have 41 build and 177 test tasks in-tree today.

 * B2G builds and tests,
 * Linux debug and some tests, and
 * OS X cross-compiled builds
