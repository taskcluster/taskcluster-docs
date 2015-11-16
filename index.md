---
layout: default
class:  markdown
---
TaskCluster - Mozilla Testing Infrastructure
============================================

**TaskCluster is** a set of components that manages task queuing, scheduling,
execution and provisioning of resources. It was designed to run automated builds
and test at Mozilla.

![taskcluster components](/assets/overview.png)

The diagram above illustrates how some of the most important
**taskcluster components** interact.
When a user submits a task-graph to the scheduler, it posts tasks to
the queue, from where the tasks are executed by workers. All the while a
provisioner launches worker nodes depending on how many pending tasks we have.

Below you'll see an illustration of the **layers** from task-graph to task to
run on some worker node.

![taskcluster layers](/assets/layers.png)
