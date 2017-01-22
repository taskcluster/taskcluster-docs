---
title: Using the APIs
order: 21
---

TaskCluster uses a microservices architecture, with each service exposing a
small set of API endpoints. Those enpodints, and other details of the
services, are documented in the [reference component](/reference).

All TaskCluster components use [Hawk](https://github.com/hueniverse/hawk) over
SSL for authentication and authorize access based on a set of "scopes"
associated with each client. Credentials and scopes are managed by the
[authentication](/reference/platform/auth/reference/api-docs) component.

The details are documented here, but note that you can use one of the fine
[TaskCluster clients](/manual/tools/clients) to handle all of these details for
you. They are available in a variety of languages, and are kept up-to-date
with the latest APIs.

