---
filename: design/apis/hawk/clients.md
title: Clients
order: 23
---

Taskcluster authentication begins with "clients". Each client has a name
(`clientId`) and a secret access token. These can be used together to make API
requests to Taskcluster services.

Clients can be configured to expire on a specific date. An expired client is
no longer recognized by Taskcluster services. Clients can also be disabled;
this is used to prevent use of clients for which an associated user no longer
has permission. Most users do not have permission to enable a client.

Every client also has a set of [scopes](scopes). The client's scopes
control the client's access to Taskcluster resources. The scopes are
*expanded* by substituting roles, as defined in the [roles](roles) section.

The set of defined clients is visible in the [Clients
tool](http://tools.taskcluster.net/auth/clients/). This interface helpfully
shows both the scopes configured for the client, and the "expanded scopes" that
result after all roles are expanded. Note that, in keeping with the open
nature of Taskcluster, anyone can see the full list of clients.

**NOTE** Taskcluster does not identify users. All API calls are made with
Taskcluster credentials, which include a `clientId`, but that identifier does
not necessarily relate to a specific person or "user account" of any sort.