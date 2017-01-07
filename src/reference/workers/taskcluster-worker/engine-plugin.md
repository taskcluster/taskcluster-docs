---
title: Engine-Plugin interaction
order: 40
sequence_diagrams: true
---

Putting this all together, we get the following interactions.

It is important to remember that in a real worker there will be multiple
plugins, and a single engine. TaskPlugins live in their own go routines, and
can operate on the SandboxBuilder/Sandbox/ResultSet in parallel.

Only when all TaskPlugins have completed configuring a SandboxBuilder
(`BuildSandbox()`), will it become a Sandbox.

Only when all TaskPlugins have completed `Stop()`, will `Finished()` be called.

Only when all TaskPlugins have completed `Finished()`, will `Dispose()` be
called against all the TaskPlugins.

This behaviour is implemented via
[WaitGroups](https://golang.org/pkg/sync/#WaitGroup).

<div class="sequence-diagram-hand">
participant Main
participant Plugin
participant TaskPlugin
participant Engine
participant SandboxBuilder
participant Sandbox
participant ResultSet

Main           ->  Plugin         : NewTaskPlugin()
Plugin         --> Main           : TaskPlugin
Main           ->  TaskPlugin     : Prepare()
Main           ->  Engine         : NewSandboxBuilder()
Engine         --> Main           : SandboxBuilder
Main           ->  TaskPlugin     : BuildSandbox()
Note over SandboxBuilder : Sandbox built by ALL plugins
Main           ->  SandboxBuilder : StartSandbox()
SandboxBuilder --> Main           : Sandbox
Main           ->  TaskPlugin     : Started()
Main           ->  Sandbox        : WaitForResult()
Sandbox        --> Main           : ResultSet
Main           ->  TaskPlugin     : Stopped()
Main           ->  TaskPlugin     : Finished()
Main           ->  TaskPlugin     : Dispose()
Main           ->  ResultSet      : Dispose()
</div>


