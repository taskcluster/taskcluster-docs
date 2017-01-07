---
title: TaskCluster Worker
order: 2
sequence_diagrams: true
---

The TaskCluster Worker is our latest worker, written in Go, which is intended
to replace all other workers.

We wanted to write a worker that had a pluggable architecture, to make it super
simple for people to create their own custom workers with their own feature
sets, supporting arbitrary platforms, without needing to fork the worker
codebase. This is achieved with a runtime discovery of
[plugins](https://godoc.org/github.com/taskcluster/taskcluster-worker/plugins#Plugin)
(worker features) and
[engines](https://godoc.org/github.com/taskcluster/taskcluster-worker/engines#Engine)
(supported environments).

The worker comes shipped with a default set of features and engines, which can
be trivially enabled or disabled, in addition to any custom features and/or
engines that the developer wishes to add, simply by adjusting the go build
import paths.

For more information, see the [reference section](/reference/workers/taskcluster-worker).
