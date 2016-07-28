---
title: Third Party Integration
order: 70
---

TaskCluster's authorization mechanism is general and can be used for services not related to TaskCluster itself.
This is particularly useful for services with a similar audience, which will benefit from users' existing familiarity with TaskCluster.

# Getting Credentials

You can interact with TaskCluster by redirecting your users to a TaskCluster URL as described below.
If the user authenticates correctly and grants your service access, they are redirected back to your site with a set of [temporary credentials](/manual/apis/temporary-credentials) based on their assigned scopes.

# Guidelines

Before jumping in to the technical details, a few words of caution are required.
When a user clicks "Grant" for your service, they are trusting your service with their credentials.
Even for a trivial service, this can be a heavy burden!

Limit the places you copy these credentials:

 * Do not send them to your backend, if possible.
 * Do not log them in your backend.
 * Redirect, or rewrite `window.location`, to remove them from the browser's location bar.

*Do not* use clientIds for authentication.
First, because mere posession of a credential with a clientId and some 44-character accessToken does not prove anything until you have validated that the accessToken is valid.
Second, even if you validate the accessToken, TaskCluster is fairly permissive in creation of temporary credentials with arbitrary clientIds, by design.
The information you may rely on for authorization is contained in the list of scopes returned from the [auth.authenticateHawk](/reference/platform/auth/api-docs#authenticateHawk) method.

# Approaches

## Frontend-Only Use

If your application is a frontend-only tool, or only needs to call TaskCluster APIs on behalf of the user, you can perform the Access Grant process, then store the resulting credentials in the JavaScript heap or (to survive reloads) LocalStorage.
Simply use those credentials along with the TaskCluster client to make calls to TaskCluster APIs.

If you would like to perform additional error-checking, you can use those credentials to call [auth.currentScopes](/reference/platform/auth/api-docs#currentScopes).

## Authorizing With Scopes

The ideal way for your service to use TaskCluster credentials is to accept TaskCluster authentication on calls to your backend API.
This is quite simple: call [auth.authenticateHawk](/reference/platform/auth/api-docs#authenticateHawk) from your backend with the appropriate parts of the HTTP request.
Then verify that the returned scopes satisfy the scopes required for the operation being protected.
There is no need to "register" the scopes you would like to use, but see the [namespaces document](/manual/devel/namespaces) for guidance on selecting appropriate names.

The advantage of this approach is that it facilitates service re-use: anyone who is familiar with TaskCluster APIs can call your API, whether from a task, the command line, the browser, or another service.
Furthermore, the backend never sees the credentials, just the Hawk signature.

If you build a user interface around this approach, it is safe to display the clientId to the user so they can recognize the login.
Just be cautious of the warning above regarding using clientIds for authentication.

## Authenticating With Scopes

If you need to know *who* the user is, such as to look up associated information in a backend database, do not use the provided clientId.
Instead, treat the scopes returned from [auth.authenticateHawk](/reference/platform/auth/api-docs#authenticateHawk) as assertions of identity and group membership.

In particular, look for scopes of the forms:

 * `assume:mozilla-user:<email>`
 * `assume:mozillians-user:<username>`
 * `assume:mozilla-group:<group>`
 * `assume:mozillians-group:<group>`

This is one of the rare cases where you should *not* apply scope expansion; that is, posessing `assume:mozillians-user:*` should not allow a user to see data for all mozillians!

See the [tc-login](/reference/core/login) reference documentation for more.

# Access Grant Process

Your service should redirect the user's browser to `https://login.taskcluster.net/?target=<target>&description=<description>`. Once the user has authenticated, they will be presented with a button to grant access to the target <target> (while <decription> is displayed as markdown).

If user clicks the button to grant access to <target>, the user will be redirected to `<target>?clientId=...&accessToken=...&certificate=...`, so that the <target> URL may obtain the temporary TaskCluster credentials.
The target URL should take pains to modify the browser location as quickly as possible to prevent disclosing the accessToken.
