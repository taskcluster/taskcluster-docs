---
filename: using/integration/frontend.md
title: Frontend Applications
order: 10
---

A frontend application -- one which executes in the browser -- can easily make
calls to Taskcluster APIs using the user's credentials.

The application should handle user logins using the normal Mozilla process --
currently using OpenID Connect via Auth0 and following the IAM team's
[recommendations](https://wiki.mozilla.org/Security/Guidelines/OpenID_connect).
This can support either a single page application
(["SPA"](https://auth0.com/docs/clients#client-types)) with no backend or a
hybrid ("[regular web
application](https://auth0.com/docs/clients#client-types)").

This process supports any authentication and authorization your application
needs for itself - displaying the user's name, storing user settings, or
controlling access to resources based on the user identity.

With a few extra parameters to the login process, this process will produce an
access token which can also be exchanged for Taskcluster credentials as they
are needed, by making an API call to the [login
service](/reference/integrations/taskcluster-login).

The Taskcluster credentials have a very short expiration, but can be requested
again when required. Callers should check the expiration before every call to a
Taskcluster API and refresh when necessary.

## Demo

The
[taskcluster-oidc-test](https://github.com/taskcluster/taskcluster-oidc-test)
repository provides an example of a sipmle SPA following this process.  You can
see it in action at https://taskcluster-oidc-test.herokuapp.com.

## Details

For more details, see the [Taskcluster-Login
Reference](/reference/integrations/taskcluster-login/docs/getting-user-creds).

