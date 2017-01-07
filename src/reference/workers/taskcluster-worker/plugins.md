---
title: Plugins
order: 30
sequence_diagrams: true
---

Plugins provide (typically engine-independent) features.

There are plugins for setting environment variables, managing cache folders,
cancelling tasks, serving livelogs, proxying TaskCluster requests, providing
interactive features such as VNC and SSH access, as well as many other things.
And, of course, you can extend the worker with your own custom plugins.

The core of the worker takes care of the claiming tasks,
creating/configuring/calling/destroying engine and plugin instances (called
sandboxes and task plugins, respectively), and handling core features such as
logging, queue polling, etc. These features are all independent of the given
plugins and engines, and therefore the core of the worker should be a stable
base to build highly varied workers on top of, with very different requirements
and constraints.

Plugins can be tested independently of engines (since they are cross-engine)
and engines can be tested independently of the plugins. For features which are
engine-specific, engines may return a _feature not supported_ error. Although
this might sound like an unwanted runtime error, it is not. At worker type
creation time, the set of available features is determined, and a task payload
JSON schema is constructed for the given worker type, and _registered_ with the
Queue. This means the Queue will reject task submissions that violate the
available features of a given worker type, by validating the task definition
against the JSON schema for that worker type.

Therefore it is impossible for workers to claim tasks that require features
that they do not support, and thus _feature not supported_ is not a runtime
error that breaks a task, but rather an error that is interpreted at worker
type creation time to limit the task payload JSON schema that will be
registered with the Queue for that worker type.

---

### Plugin Lifecycle

Much like engines, there is a staged lifecycle for Plugins.
[PluginProvider](https://godoc.org/github.com/taskcluster/taskcluster-worker/plugins/extpoints#PluginProvider)
exposes a method to create a
[Plugin](https://godoc.org/github.com/taskcluster/taskcluster-worker/plugins#Plugin).
In tests a Plugin instance will be created with each test. Otherwise, a single
Plugin will be created at worker startup, and live until the worker stops/dies.

Plugin then provides a method `NewTaskPlugin(TaskPluginOptions)` which returns
a
[TaskPlugin](https://godoc.org/github.com/taskcluster/taskcluster-worker/plugins#TaskPlugin).
This is an instance dedicated to the given task. Unlike the SandboxBuilder ->
Sandbox -> ResultSet counterpart, Plugin does not mutate into other types
during the task lifecycle.

<div class="sequence-diagram-hand">
participant Main
participant PluginProvider
participant Plugin
participant TaskPlugin

Main           ->  PluginProvider : NewPlugin(PluginOptions)
PluginProvider --> Main           : Plugin
Main           ->  Plugin         : NewTaskPlugin(TaskPluginOptions)
Plugin         --> Main           : TaskPlugin
Main           ->  TaskPlugin     : Prepare()
Main           ->  TaskPlugin     : BuildSandbox()
Main           ->  TaskPlugin     : Started()
Main           ->  TaskPlugin     : Stopped()
Main           ->  TaskPlugin     : Finished()
Main           ->  TaskPlugin     : Dispose()
</div>

