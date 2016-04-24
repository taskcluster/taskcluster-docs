# Gecko and TaskCluster

When a developer pushes to a Gecko repository, a long chain of events begins:

 * A "decision task" is created to decide what to do with the push.
 * The decision task creates a lot of additional tasks.
   These tasks include build and test tasks, along with lots of other kinds of tasks to build docker images, build toolchains, perform analyses, check syntax, and so on.
 * These tasks are arranged in a "task graph", with some tasks (e.g., tests) depending on others (builds).
   Once its prerequisite tasks complete, a dependent task begins.
 * The result of each task is sent to [TreeHerder](https://treeherder.mozilla.org) where developers and sheriffs can track the status of the push.
 * The outputs from each task -- log files, Firefox installers, and so on -- appear attached to each task when it completes.

# Next Steps

Due to its "self-service" desgn, very little of this process is actually part of TaskCluster, so we provide only a brief overview and some pointers.
TaskCluster provides a small bit of glue ([mozilla-taskcluster](/manual/vcs/mozilla-taskcluster)) to create the decision task, but the task itself is defined entirely in-tree.
Similarly, TreeHerder is a separate service, not operated as a part of TaskCluster, although mozilla-taskcluster does feed data to it based on `task.extra`.

 * [How is the decision task defined?](gecko-decision-task) - TODO
 * [How is the task-graph generated?](gecko-task-graph) - TODO
 * [How do try pushes work?](gecko-try-pushes) - TODO
 * [How are the docker images created?](gecko-docker-images) - TODO
