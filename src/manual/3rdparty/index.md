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
First, because mere possession of a credential with a clientId and some 44-character accessToken does not prove anything until you have validated that the accessToken is valid.
Second, even if you validate the accessToken, TaskCluster is fairly permissive in creation of temporary credentials with arbitrary clientIds, by design.
The information you may rely on for authorization is contained in the list of scopes returned from the [auth.authenticateHawk](/reference/platform/auth/api-docs#authenticateHawk) method.

*CAUTION:* remember that you are dealing with powerful credentials belonging to real users.
Think carefully about how you handle those credentials, and how you can minimize the handling that you do.
Beyond that, what plans you have for detecting and handling credential disclosure?

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

This is one of the rare cases where you should *not* apply scope expansion; that is, possessing `assume:mozillians-user:*` should not allow a user to see data for all Mozillians!

See the [tc-login](/reference/core/login) reference documentation for more.

# Don't be a [Confused Deputy](https://en.wikipedia.org/wiki/Confused_deputy_problem)

If the service you are building acts on behalf of users, with its own TaskCluster credentials, you must be very careful to avoid allowing malicious users to abuse your privileges through scope escalation.
Scope escalation is when a user can cause some action for which they do not have the appropriate scopes.

For example, your service might create tasks based on a user's selections in a browser form.
If the service has the scopes to create tasks that can read secrets, but does not verify that the user has such permission, then the service would provide a way for malicious users to create tasks that display those secrets.
The user has escalated their access to include those scopes which they did not already possess.

The phrase "confused deputy" refers to the case where a service performs some actions on a user's behalf (as a deputy), but allows scope escalation (confused).

## Don't be a Deputy

The best way to avoid this issue is to not act as a deputy.
This means using the user's own TaskCluster credentials to create the tasks, rather than using credentials assigned to the service.
In the example above, ideally the user's credentials would be stored locally in the browser, and the client-side code would call the queue's `createTask` method directly.
A less optimal solution would involve sending the user's credentials to the backend and using those credentials to call `createTask` on the backend.

## Deputy Tools

If you must act as a deputy -- for example, running tasks without a browser involved -- TaskCluster provides a tool to prevent confusion.

This tool is [Authorized Scopes](authorized-scopes), which are used with an API call to reduce the scopes available to that call.
For example, a service which creates tasks during low-load times might have a `createDelayedTask` API method taking a time and a task definition.

The obvious, but incorrect, way to authenticate this would be to duplicate the `queue.createTask` permissions model, verifying the caller possess the scopes in `task.scopes`.
When the system load fell and it was time to run the task, the service would call `queue.createTask` using its own credentials.
But there are already some subtlties in queue's permissions model, and that model may change over time, introducing a scope-escalation vulnerability.

The better answer is to capture the scopes of the credentials used to call `createDelayedTask`.
When calling `queue.createTask`, pass those scopes as `authorizedScopes`.
This method avoids any interpretation of scopes by the delayed-task service, so there is no possibility of a scope escalation.

This better answer does lose the advantage of error-checking: `createDelayedTask` will happily accept a task for which the user does not have scopes, but will fail when the service calls `queue.createTask`.
It's safe to fix this with an approximation to the queue permissions model, as long as the `authorizedScopes` are still enforced.
The failure modes for this check are acceptable: either `createDelayedTask` refuses to create a delayed task which should be accepted, or it accepts a task which will later fail due to the `authorizedScopes`.

# Access Grant Process

Your service should redirect the user's browser to `https://login.taskcluster.net/?target=<target>&description=<description>`. Once the user has authenticated, they will be presented with a button to grant access to the target <target> (while <decription> is displayed as markdown).

If user clicks the button to grant access to <target>, the user will be redirected to `<target>?clientId=...&accessToken=...&certificate=...`, so that the <target> URL may obtain the temporary TaskCluster credentials.
The target URL should take pains to modify the browser location as quickly as possible to prevent disclosing the accessToken.

## Troubleshooting

If your access checks are not working, the most common error is forgetting to handle the certificate in addition to the clientId and accessToken.
There is no need to interpret the certificate (please don't!); just treat it as an opaque string.
Omitting the certificate when it is required will generally result in "Bad Mac" errors.
