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
