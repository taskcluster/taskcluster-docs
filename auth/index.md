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
authenticate against TaskCluster using
[Hawk](https://github.com/hueniverse/hawk) with HMAC-sha256.

Authorization
-------------
All resources (such as API end-points) in taskcluster is guarded by scopes.
Typically, an API end-point has a list of scopes from which you must satisfy at
least one scope to be authorized to use the API end-point. This list of scopes
is often clearly listed in the API documentation for the end-point.

**But beware**, API end-points may require additional scopes, that depends on
the payload of the request. Read API end-point to documentation to discover
these.

Restricting Authorized Scopes
-----------------------------
If you are authorizing requests on behalf of a less trusted entity that you only
know to posses a subset of your scopes. You can specify which of the scopes you
have that a given request is authorized to rely on. If the request cannot be
authorized with the restricted set of scopes you specified, it will fail, even
though you may in fact have the scopes required to conduct the request.

**Example**, imagine that Alice have the following scopes `scopeA`, `scopeB` and
`scopeC`, and Alice wishes to conduct a request on behalf of Bob. Alice knows
that Bob has `scopeA` and `scopeC`, but she doesn't know if Bob has `scopeB`.
In this case Alice can avoid escalating Bobs permissions by executing requests
on behalf of Bob with a limited set of scopes.
Specifically, Alice will specify the `authorizedScopes` key as specified below.

```js
{
  authorizedScopes:  ['scopeA', 'scopeC']
}
```

Then Alice will base64 encode the JSON object above and include as the `ext`
attribute in Hawk. When the server receives the request from Alice it will
first validate that Alice have all the scopes specified in `authorizedScopes`,
and then use the restricted set of scopes `scopeA` and `scopeB` to evaluate
if the request is authorized.

This technique is used in the task-graph scheduler to ensure that tasks created
are only created with the set of scopes that the task-graph has. Similarly it's
used in the docker-workers authentication proxy, to only authorize requests with
the set of scopes that the current task has available.

**Note** the way hawk works, the `ext` property is covered by the HMAC
signature. So it's not possible to modify this property on-the-fly.


Pre-signed Urls
---------------
Hawk allows you to generate a _bewit_ signature for any `GET` request. Including
this _bewit_ signature in your request will then authenticate and authorize the
request. All taskcluster APIs supports authentication of `GET` requests using
these bewit signatures. And you'll find that the official
[taskcluster-client](https://github.com/taskcluster/taskcluster-client)
offers an API for generating these signatures.
