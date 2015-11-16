---
layout: default
class:  markdown
---
<img style="float: left; width: 20%; padding-right: 1em; padding-bottom: 1em;" src="/assets/taskcluster.svg" />

TaskCluster - Mozilla's CI Infrastructure
=========================================

**TaskCluster** is a set of components that manages task queuing, scheduling,
execution and provisioning of resources.  It was designed to run automated builds
and tests at Mozilla.

<br clear="all"/>
The diagram below illustrates how some of the most important
**TaskCluster components** interact.
When a user submits a task-graph to the scheduler, it posts tasks to
the queue, from where the tasks are executed by workers. All the while a
provisioner launches worker nodes depending on how many pending tasks we have.

![TaskCluster components](/assets/overview.png)

Below you'll see an illustration of the **layers** from task-graph to task to
run on some worker node.

![TaskCluster layers](/assets/layers.png)
