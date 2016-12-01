---
title: Tasks and Task Execution
order: 20
---

This chapter focuses on creating tasks and how they are executed.

At the highest level, TaskCluster executes tasks.  New tasks are added to one
of several queues, and workers consume tasks from those queues.  In the
process, these services send Pulse messages about task status, and attach the
results of the task -- including logs and output artifacts -- to the task
itself.
