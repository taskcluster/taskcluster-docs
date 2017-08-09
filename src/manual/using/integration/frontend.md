---
filename: using/integration/frontend.md
title: Frontend Applications
order: 10
---

# Guidelines

Before jumping in to the technical details, a few words of caution are
required.  When a user clicks "Grant" for your service, they are trusting your
service with their credentials.  Even for a trivial service, this can be a
heavy burden!

Limit the places you copy these credentials:

 * Do not send them to your backend, if possible.
 * Do not log them in your backend.
 * Redirect, or rewrite `window.location`, to remove them from the browser's location bar.

*Do not* use `clientId`s for authentication.  First, because mere possession of
a credential with a clientId and some 44-character accessToken does not prove
anything until you have validated that the accessToken is valid.  Second, even
if you validate the accessToken, Taskcluster is fairly permissive in creation
of temporary credentials with arbitrary `clientId`s, by design.  The
information you may rely on for authorization is contained in the list of
scopes returned from the
[`auth.authenticateHawk`](/reference/platform/auth/reference/api-docs#authenticateHawk)
method.

*CAUTION:* remember that you are dealing with powerful credentials belonging to
real users.  Think carefully about how you handle those credentials, and how
you can minimize the handling that you do.  Beyond that, what plans you have
for detecting and handling credential disclosure?

# Current State

If you are building a frontend application which would like to interact with
Taskcluster APIs on behalf of users, Taskcluster currently does not provide a
great experience. The major issue is that Taskcluster does not provide user
authentication, but just provides a set of Taskcluster credentials.

This situation will change soon, though -- see [Taskcluster-Login
docs](https://docs.taskcluster.net/reference/integrations/taskcluster-login/docs/)
for details.  Among other benefits, this new approach will give your
application much better access to the user's identity.

# Getting Credentials

You can interact with Taskcluster by redirecting your users to a Taskcluster
URL as described in the [Taskcluster-Login
docs](https://docs.taskcluster.net/reference/integrations/taskcluster-login).
If the user authenticates correctly and grants your service access, they are
redirected back to your site with a set of [temporary
credentials](temporary-credentials) based on their assigned scopes.

Store the resulting credentials in the JavaScript heap or (to survive
reloads) LocalStorage.  Simply use those credentials along with the Taskcluster
client to make calls to Taskcluster APIs.

If you need to display some identifying information for the user, such as a
"you are logged in as.." tooltip, you may use the clientId.  However, as
mentioned above, the clientId should not be used alone to authenticate a user,
as it can be forged. If you need to definitively identify a user, contact the
Taskcluster team to talk about available options and plans.

If you would like to perform additional error-checking, you can use those
credentials to call
[`auth.currentScopes`](/reference/platform/auth/reference/api-docs#currentScopes).

## Don't be a [Confused Deputy](https://en.wikipedia.org/wiki/Confused_deputy_problem)

If the service you are building acts on behalf of users, but uses its own
Taskcluster credentials (for example, on the backend, to avoid storing users'
credentials), you must be very careful to avoid allowing malicious users to
abuse your privileges through scope escalation.  Scope escalation is when a
user can cause some action for which they do not have the appropriate scopes.

For example, your service might create tasks based on a user's selections in a
browser form.  If the service has the scopes to create tasks that can read
secrets, but does not verify that the user has such permission, then the
service would provide a way for malicious users to create tasks that display
those secrets.  Then the user has escalated their access to include those scopes
which they did not already possess.

The phrase "confused deputy" refers to the case where a service performs some
actions on a user's behalf (as a deputy), but allows scope escalation
(confused).

### Don't be a Deputy

The best way to avoid this issue is to not act as a deputy.  This means using
the user's own Taskcluster credentials to create the tasks, rather than using
credentials assigned to the service.  In the example above, ideally the user's
credentials would be stored locally in the browser, and the client-side code
would call the queue's `createTask` method directly.

### Deputy Tools

If you must act as a deputy -- for example, running tasks without a browser
involved -- Taskcluster provides a tool to prevent confusion.

This tool is [Authorized Scopes](authorized-scopes), which are used with an API
call to reduce the scopes available to that call.  For example, a service which
creates tasks during low-load times might have a `createDelayedTask` API method
taking a time and a task definition.

The obvious, but incorrect, way to authenticate this would be to duplicate the
`queue.createTask` permissions model, verifying the caller possess the scopes
in `task.scopes`.  When the system load fell and it was time to run the task,
the service would call `queue.createTask` using its own credentials.  But there
are already some subtleties in queue's permissions model, and that model may
change over time, introducing a scope-escalation vulnerability.

The better answer is to capture the scopes of the credentials used to call
`createDelayedTask`.  When calling `queue.createTask`, pass those scopes as
`authorizedScopes`.  This method avoids any interpretation of scopes by the
delayed-task service, so there is no possibility of a scope escalation.

This better answer does lose the advantage of error-checking:
`createDelayedTask` will happily accept a task for which the user does not have
scopes, but will fail when the service calls `queue.createTask`.  It's safe to
fix this with an approximation to the queue permissions model, as long as the
`authorizedScopes` are still enforced.  The failure modes for this check are
acceptable: either `createDelayedTask` refuses to create a delayed task which
should be accepted, or it accepts a task which will later fail due to the
`authorizedScopes`.
