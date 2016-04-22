---
order: 2
title: Scopes
---

Scopes
======

A scope is simply a string, limited to printable ASCII characters.  Scopes
generally travel in sets.  For example, a typical client will have a set of a
few dozen scopes.

Satisfaction
------------

A set of scopes A is said to "satisfy" another set of scopes B if every scope
in B is also in A.  In a practical sense, A is often the set of scopes
associated with some TaskCluster credentials, and B is the set of scopes
required by an API call.  If A satisfies B, then the call is permitted.

The more mathematically inclined may like to think of this as a subset
relationship: B ⊆ A.

There is one piece of special syntax in scopes: a final `*` character acts as a
wildcard, matching any suffix.  So `queue:create-task:test-provisioner/*`
satisfies `queue:create-task:test-provisioner/worker3`.  The reverse is not
true.  The wildcard only works at the end of a string: no more advanced
pattern-matching functionality is available.

Even so, this is an incredibly powerful technique, as all of the scopes
required by TaskCluster services have been carefully designed with
more-specific attributes on to the right of less-specific attributes.

But I Thought Scopes Were Crazy Complicated?
--------------------------------------------

Nope, that's all there is to it!
