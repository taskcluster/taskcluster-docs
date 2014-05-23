---
layout:   default
class:    markdown
---
Authentication and Authorization
================================

All TaskCluster components uses on Hawk over SSL for authentication and
authorizes access based on a set of scopes associated with each client.

Credentials and scopes are managed by the authentication component, at
[auth.taskcluster.net](http://auth.taskcluster.net). These pages covers
general authentication topics as well as API end-points from this component.

Authentication
--------------
All clients are issued a `clientId` and an `accessToken` these are used to
authenticate against TaskCluster with
[Hawk](https://github.com/hueniverse/hawk) using HMAC-sha256.

Authorization
-------------
All resources (such as API end-points) in taskcluster is guarded by scopes.
Typically, an API end-point has a list of scopes from which you must satisfy at
least one scope to be authorized to use the API end-point. This list of scopes
is often clearly listed in the API documentation for the end-point.

**But beware**, API end-points may require additional scopes, that depends on
the payload of the request. Read API end-point to documentation to discover
these.

Delegated Authentication
------------------------
If you have a trusted entity that knows what scopes you are authorized for,
then this entity can perform requests on your behalf. For example this allows
the scheduler to perform requests on behalf of your task-graph with the scopes
your task-graph is authorized to use. This is also the mechanism that allows
trusted worker processes to carry out requests on behalf of a running task.

The trusted entity needs the scope `auth:can-delegate`, it then makes a request
with Hawks `ext` attribute set to a base64 encoded JSON object on the following
format:

```js
{
  delegating:   true,
  scopes:       ['component:action:resource-prefix*', ...]
}
```

When the request arrives the server will check that requesting entity has the
`auth:can-delegate` scope, but will then otherwise evaluate the authorization
based on the set of scopes listed in the request.

The main purpose is that the trusted entity can safely authenticate your
request with evaluating whether or not you actually have the scopes to perform
the request. This evaluation is handled on the target server.

The alternative would be to create a `clientId` and `accessToken` for each task,
with the set of scopes the task is allowed to use, and then have to task call
various components directly. But since the worker knows what scopes the task has
it can authenticate requests on behalf of the task.

**Note** the way hawk works, the `ext` property is covered by the HMAC
signature. So it's not possible to modify this property on-the-fly. But
obviously any trusted entity with the scope `auth:can-delegate` can fake any
scope it wishes. We may mitigate that in the future.
