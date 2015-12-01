---
layout:   default
class:    markdown
---

Conventions
===========

TaskCluster is a very open platform!
To help us with our day to day work, we have created some standard approaches and conventions.
These make administration and coordination between the humans using the platform easier.

## Scopes and Roles

### When To Require A Role

When verifying the scopes for an API call or some other operation, the default behavior should be to check for appropriately-parameterized scopes.
These answer the question, "Can the caller do X".

However, when the operation modifies an object which will later perform actions using a role, then it is appropriat to require that the caller posess that role.
For example, hooks trigger tasks using role `hook-id:<hookGroupId>/<hookId>`, so the API calls to create and modify the hook require `assume:hook-id:<hookGroupId>/<hookId>` directly.
It is not enough simply to possess the role's extended scopes -- the caller must possess the assumed role itself.
