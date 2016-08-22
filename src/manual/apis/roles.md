---
title: Roles
order: 4
---

Roles
=====

A _role_ consists of a `roleId`, a set of scopes and a description.  Each role
constitutes a simple _expansion rule_ that says if you have the scope
`assume:<roleId>` you get the set of scopes associated with the role named
`roleId`.  Roles can refer to other roles in the same way.


Stars in Roles
--------------

As in scopes, a final `*` in a role ID acts as a wildcard.  It matches any
`assume` scope of which it is a prefix.  For example, the role ID
`repo:github.com/taskcluster/*` will match
`assume:repo:github.com/taskcluster/taskcluster-auth`.

When roles are concerned, stars expand in two ways:

 * (scope expansion) An `assume` scope ending in a star will satisfy any scope
   implied by any role of which it is a prefix.  For example, if role
   `repo:github.com/taskcluster/taskcluster-auth` has scope
   `secrets:get:auth-tests`, then credentials with scope
   `assume:repo:github.com/taskcluster/*` can get the `auth-tests` secret.
   This means that `assume:` scopes ending in a star can be very powerful!

 * (role expansion) A role ending in a star will apply to all roles of which it
   is a prefix.  For example, if role `hook:taskcluster/*` has scope
   `queue:create-task:aws-provisioner/taskcluster-hooks`, then a credential
   with `assume:hook:taskcluster/nightly-diagnostics` can create a task with
   the `taskcluster-hooks` worker type.

In Practice
-----------

In practice, roles are used in a few ways within TaskCluster:

 * As a shorthand for a commonly-used set of scopes
 * As a means of associating scopes with external things such as source-code repositories or users
 * As a way to configure scopes for TaskCluster resources like hooks or worker types
 * As a scope allowing the bearer to "assume" the named role.

See the [namespaces](/manual/devel/namespaces) document for more information.

The set of defined roles is visible in the [Roles
tool](http://tools.taskcluster.net/auth/roles/).  This interface helpfully
shows both the scopes configured for the role, and the "expanded scopes" for
that role.  The latter value can be a little misleading for `*`-suffixed
scopes, so be careful and if in doubt, create a throwaway client to test your
assumptions.
