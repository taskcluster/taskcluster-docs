---
title: Engines
order: 20
sequence_diagrams: true
---

Engines represent the environment that the worker runs in, such as a native
engine on Windows, a docker engine on linux, a chroot engine on OS X, or even a
mobile device.

At its simplest, an engine is responsible for providing an environment for
executing tasks. It provides features such as setting environment variables,
executing commands, extracting artifacts, mounting caches, etc. You can think
of it as being like a container, that the task runs inside. The specific set of
features that it needs to support is a function of the plugins which are
enabled.

### Engine Lifecycle

The entry point is an
[EngineProvider](https://godoc.org/github.com/taskcluster/taskcluster-worker/engines/extpoints#EngineProvider).
The EngineProvider exposes the factory method `NewEngine(EngineOptions)` which
returns an
[Engine](https://godoc.org/github.com/taskcluster/taskcluster-worker/engines#Engine).
In unit tests, a new engine is created for each test case. When running
normally (not in tests) a single Engine will be created at worker startup, and
will persist until the worker stops/dies.

An Engine in turn provides a factory method `NewSandboxBuilder(SandboxOptions)`
which is the starting point for creating a dedicated task-specific container
for the task. The container starts life as a
[SandboxBuilder](https://godoc.org/github.com/taskcluster/taskcluster-worker/engines#SandboxBuilder),
in which its configuration and setup can be modified.

After this phase, the container can no longer be altered, and it becomes a
[Sandbox](https://godoc.org/github.com/taskcluster/taskcluster-worker/engines#Sandbox).
It holds the same data as the SandboxBuilder, but it exposes different methods,
to make the configuration immutable.

After the task has executed, and a result has been determined, the Sandbox
becomes a
[ResultSet](https://godoc.org/github.com/taskcluster/taskcluster-worker/engines#ResultSet).
Again, it essentially represents the same data as the Sandbox, but now provides
different methods (for example, unlike the Sandbox, the ResultSet cannot be
started or stopped). Using different types provides a guarantee that only valid
methods will be exposed at each lifecycle phase. Finally, the ResultSet is
disposed.

<div class="sequence-diagram-hand">
participant Main
participant EngineProvider
participant Engine
participant SandboxBuilder
participant Sandbox
participant ResultSet

Main           ->  EngineProvider : NewEngine(EngineOptions)
EngineProvider --> Main           : Engine
Main           ->  Engine         : NewSandboxBuilder(SandboxOptions)
Engine         --> Main           : SandboxBuilder
Main           ->  SandboxBuilder : StartSandbox()
SandboxBuilder --> Main           : Sandbox
Main           ->  Sandbox        : WaitForResult()
Sandbox        --> Main           : ResultSet
Main           ->  ResultSet      : Dispose()
</div>
