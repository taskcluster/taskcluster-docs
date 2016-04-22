---
order: 1
title: Using the APIs
---

Using the APIs
==============

All TaskCluster components use Hawk over SSL for authentication and
authorize access based on a set of scopes associated with each client.

Credentials and scopes are managed by the authentication component, at
[auth.taskcluster.net](http://auth.taskcluster.net).

Authentication
--------------

To access protected resources, a TaskCluster client must have credentials
consisting of a `clientId` and an `accessToken` (and sometimes a
`certificate`).  These credentials are used with the
[Hawk](https://github.com/hueniverse/hawk) protocol to authenticate each HTTP
request.

See:

 * [Clients](clients/) - clients are the basic unit of authentication
 * [Temporary Credentials](temporary-credentials/)

Authorization
-------------

All resources (such as API end-points) in TaskCluster are guarded by scopes.
Typically, an API end-point has a list of scopes which the caller must satisfy
to be authorized to use the API end-point. This list of scopes is clearly
listed in the API documentation for the end-point.

**But beware**, API end-points may require additional scopes, that depends on
the payload of the request. Read API end-point documentation to discover
these.

See:

 * [Clients](clients/) - clients define the set of available scopes
 * [Roles](roles/) - roles form a kind of "macro expansion" for scopes
 * [Temporary Credentials](temporary-credentials/) - temporary credentials can convey a set of scopes that is smaller than those of the client used to generate the credentials
 * [Authorized Scopes](authorized-scopes/) - the set of available scopes can be limited on a per-API-call basis
 * [Signed URLs](signed-urls/) - users can generate pre-signed URLs allowing other applications to access restricted resources without using Hawk
