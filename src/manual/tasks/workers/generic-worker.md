---
title: Generic Worker
order: 2
docson: true
---

The generic worker was our first worker that was intended for non-linux
environments. In theory it can run against any platform which supports the go
programming language, however in practice we use it currently only for
Windows™, and the generic worker will be soon superseded by the TaskCluster
Worker.

If you are looking at standing up new jobs, we recommend you take a look at the
TaskCluster Worker, which is intended to eventually replace the Generic Worker.

For more details on the generic worker, see the [reference section](/reference/workers/generic-worker).

## Building Firefox Desktop for Windows

Please see [Building Firefox for Windows™ on Try using
TaskCluster](http://petemoore.github.io/general/taskcluster/2015/09/30/building-firefox-for-windows-on-try-using-taskcluster.html)
for a practical walkthrough of using the Generic Worker for building Firefox
Desktop for Windows™.
