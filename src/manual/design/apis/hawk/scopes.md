---
filename: design/apis/hawk/scopes.md
title: Scopes
order: 22
---

All Taskcluster endpoints are guarded by [scopes](scopes). The authentication
information passed with each API call is used to determine a set of scopes
associated with the caller. These are compared against the scopes required by
the endpoint. If they are satisfied, the request is allowed to proceed.

The scopes required for each endpoint are documented in the reference section
of this manual. Note that some API endpoints may have additional scope
requirements that depend on the body of the request; read the endpoint
documentation carefully to discover these.

## Scopes

A scope is simply a string, limited to printable ASCII characters. Scopes
generally travel in sets. For example, a typical client will have a set of a
few dozen scopes.

## Satisfaction

A set of scopes A is said to "satisfy" another set of scopes B if every scope
in B is also in A. In a practical sense, A is often the set of scopes
associated with some Taskcluster credentials, and B is the set of scopes
required by an API call. If A satisfies B, then the call is permitted.

The more mathematically inclined may like to think of this as a subset
relationship: B ⊆ A.

There is one piece of special syntax in scopes: a final `*` character acts as a
wildcard, matching any suffix. So `queue:create-task:test-provisioner/*`
satisfies `queue:create-task:test-provisioner/worker3`. The reverse is not
true. The wildcard only works at the end of a string: no more advanced
pattern-matching functionality is available.

Even so, this is an incredibly powerful technique, as all of the scopes
required by Taskcluster services have been carefully designed with
more-specific attributes on to the right of less-specific attributes.

## But I Thought Scopes Were Crazy Complicated?

Nope, that's all there is to it!

Here are a few examples:

The scope set `["queue:create-task:aws-provisioner-v1/*",
"queue:route:index.project.persona.*"]` satisfies the scope set
`["queue:create-task:aws-provisioner-v1/persona-builder",
"queue:route:index.project.persona.build.20160101.linux64"]`.

The scope set `["secrets:get:garbage/*", "queue:create-task:*"]` satisfies the
scope set `["secrets:get:garbage/my/secret",
"secrets:get:garbage/your/secret"]`.