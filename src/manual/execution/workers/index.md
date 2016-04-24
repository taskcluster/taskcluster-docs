---
layout:   default
class:    markdown
---
Workers
=======

TaskCluster workers are software processes which consume tasks from the Queue,
perform them, and report results. Typically workers are implemented as daemons
running on dedicated instances in the cloud, but a worker can be any software
process which is capable of claiming, performing and reporting on a given
TaskCluster task. For example a worker could be a program run manually once by
a user on a physical smartphone to perform a task provided by the Queue.

The TaskCluster Queue and Scheduler do _not_ require any configuration or
programmatical changes in order to start supporting a new worker. In this
sense, they are agnostic. A task defines which `provisionerId` and `workerType`
it requires, as arbitrary string fields. So long as a worker successfully
authenticates requests to the Queue, and makes claims against the given
`provisionerId` and `workerType` combination, the Queue will cooperate by
providing Task information, and assigning tasks to the worker. This means no
Queue downtime for the roll out of a new worker. It also means one-off workers
can be written for one-off jobs, if required.

For the interaction between workers and the Queue, see [Queue - Worker
Interaction](/manual/tasks/manual/tasks/worker-interaction/).

For specific classes of workers, see the nested subsections.
