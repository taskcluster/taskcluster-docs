---
title: User Interface Considerations
order: 30
---

The actions system decouples in-tree changes from user interface changes
by taking advantage of graceful degradation. User interfaces, when
presented with an unfamiliar action, fall back to a usable default
behavior, and can later be upgraded to handle that action with a more
refined approach.

Default Behavior
----------------

Every user interface should support the following:

-   Displaying a list of actions relevant to each task, and displaying
    task-group tasks for the associated task-group.
-   Providing an opportunity for the user to enter input for an
    action. This might be in JSON or YAML, or using a form
    auto-generated from the action's JSON-schema. If the action has no
    schema, this step should be skipped. The user's input should be
    validated against the schema.

For `action.kind = 'task'`:

-   Rendering the template using the JSON-e library, using the JSON-e
    context described in action-spec.
-   Calling `Queue.createTask` with the resulting task, using the
    user's Taskcluster credentials. See the next section for some
    important security-related concerns.

For `action.kind = 'hook'`:

-   Rendering the hookPayload using JSON-e with the context describe
    in the specification.
-   Calling `Hooks.triggerHook` with the resulting hook identiifers
    and payload.

User interfaces should ignore actions with unrecognized kinds.

Security Concerns
-----------------

When executing an action, a UI must ensure that the user is authorized to
perform the action, and that the user is not being "tricked" into executing an
unexpected action. The `actions.json` artifact should be treated as untrusted
content!

To accomplish the first, the UI should create tasks with the user's
Taskcluster credentials. Do not use credentials configured as part of
the service itself!

### "task" Actions

To accomplish the second for "task" actions, use the decision tasks' `scopes`
property as the
[authorizedScopes](https://docs.taskcluster.net/manual/design/apis/hawk/authorized-scopes)
for the `Queue.createTask` call. This prevents action tasks from doing anything
the original decision task couldn't do.

### "hook" Actions

Hook actions have no such luxury, as they are intended to do things the
decision task couldn't do.

Instead, the user interface should require the user to confirm each action,
displaying the hookGroupId, hookId, and hookPayload.

Furthermore, hook implementations should be designed to guard against malicious
input, which could be triggered by phishing an unsuspecting administrator to
trigger a hook action from a low privileged task with bad intend, causing an
evil hookPayload. The hook's `triggerSchema` can be one layer of such a guard,
but the hook implementation itself should perform additional checks wherever
possible.

Specialized Behavior
--------------------

The default behavior is too clumsy for day-to-day use for common
actions. User interfaces may want to provide a more natural interface
that still takes advantage of the actions system.

### Specialized Input

A user interface may provide specialized input forms for specific
schemas. The input generated from the form must conform to the schema.

To ensure that the schema has not changed, implementers should do a deep
comparison between a schema for which a hand-written form exists, and
the schema required by the action. If the two differ, the default
behavior should be used instead.

### Specialized Triggering

A user interface may want to trigger a specific action using a dedicated
UI element. For example, an "start interactive session" button might be
placed next to each failing test in a list of tests.

User interfaces should look for the desired action by name. The UI
should check that there is exactly one matching action available for the
given task or task-graph. If multiple actions match, the UI should treat
that as an error (helping to avoid actions being surreptitiously
replaced by similarly-named, malicious actions).

Having discovered the task, the user interface has a choice in how to
provide its input. It can use the "specialized input" approach outlined
above, providing a customized form if the action's schema is recognized
and gracefully degrading if not.

But if the user interface is generating the input internally, it may
instead validate that generated input against the action's schema as
given, proceeding if validation succeeds. In this alternative, there is
no need to do a deep comparison of the schema. This approach allows
in-tree changes that introduce backward-compatible changes to the
schema, without breaking support in user interfaces. Of course, if the
changes are not backward-compatible, breakage will ensue.

#### Skipping Confirmation

A user interface that specializes for an action may skip the user-confirmation
process for hook actions if any of

* it can whitelist specific hooks -- for example, a retrigger action might
  always use a hook with a specific name or pattern;

* it can determine that the `actions.json` is trusted -- for example, if the
  task is definitively associated with a commit to a trusted repository; or

* it can limit the scopes available using
  [authorizedScopes](https://docs.taskcluster.net/manual/design/apis/hawk/authorized-scopes)
  based on some other definitive information about the task -- for example,
  actions on a task not created from a Github "master" branch might use
  authorizedScopes to limit access to only pull-request-related actions.
