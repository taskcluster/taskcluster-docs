---
order: 1
title: Using the APIs
---

Using the APIs
==============

TaskCluster uses a microservices architecture, with each service exposing a
small set of API endpoints.  Those enpodints, and other details of the
services, are documented in the [reference component](/reference).

All TaskCluster components use [Hawk](https://github.com/hueniverse/hawk) over
SSL for authentication and authorize access based on a set of "scopes"
associated with each client.  Credentials and scopes are managed by the
authentication component, at
[auth.taskcluster.net](http://auth.taskcluster.net).

The details are documented here, but note that you can use one of the fine
[TaskCluster clients](/manual/tools/clients) to handle all of these details for
you.  They are available in a variety of languages, and are kept up-to-date
with the latest APIs.

Authentication and Authorization
--------------------------------

To access protected resources, a TaskCluster client must have credentials
consisting of a `clientId` and an `accessToken` (and sometimes a
`certificate`).  These credentials are used with the Hawk protocol to
authenticate each HTTP request.

All resources (such as API end-points) in TaskCluster are guarded by scopes.
Typically, an API end-point has a list of scopes which the caller must satisfy
to be authorized to use the API end-point. This list of scopes is clearly
listed in the API documentation for the end-point.  **But beware**, API
end-points may require additional scopes, that depends on the payload of the
request. Read API end-point documentation to discover these.

See the remaining sections in this chapter for the details about clients,
scopes, roles, and so on.
