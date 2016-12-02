---
title: Pre-signed URLs
order: 7
---
Pre-signed Urls
===============

Hawk allows you to generate a _bewit_ signature for any `GET` request. Including
this _bewit_ signature in your request will then authenticate and authorize the
request. All TaskCluster APIs support authentication of `GET` requests using
these bewit signatures. And you'll find that the official
[taskcluster-client](https://github.com/taskcluster/taskcluster-client)
offers an API for generating these signatures.

Pre-signed URLs are most often used to provide signed URLs allowing another
application to download a private artifact without including TaskCluster
authentication headers.
