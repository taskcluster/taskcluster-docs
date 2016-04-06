---
layout:   default
class:    markdown
---

Roles
=====

A _role_ consists of a `roleId`, a set of scopes and a description.  Each role
constitutes a simple _expansion rule_ that says if you have the scope
`assume:<roleId>` you get the set of scopes associated with the role named
`roleId`.  Roles can refer to other roles in the same way.

It is common to think of roles as a kind of shorthand for scopes.  Another
perspective is to think of `assume:<roleId>` as a scope that allows a client to
assume the named role.

Stars in Roles
--------------

As in scopes, a final `*` in a role ID acts as a wildcard.  It matches any
`assume` scope of which it is a prefix.  For example, the role ID
`repo:github.com/taskcluster/*` will match
`assume:repo:github.com/taskcluster/taskcluster-auth`.

In Practice
-----------

In practice, roles are used in a few ways within TaskCluster:

 * As a shorthand for a commonly-used set of scopes
 * As a means of associating scopes with external things such as source-code repositories or users
 * As a way to configure scopes for TaskCluster resources like hooks or worker types

See the [namespaces](../../devel/namespaces/) document for more information.

The set of defined roles is visible in the [Roles
tool](http://tools.taskcluster.net/auth/roles/).  This interface helpfully
shows both the scopes configured for the role, and the "expanded scopes" for
that role.  The latter value can be a little misleading for `*`-suffixed
scopes, so be careful and if in doubt, create a throwaway client to test your
assumptions.
