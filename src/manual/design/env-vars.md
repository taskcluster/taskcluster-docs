---
title: Standard Environment Variables
order: 29
---

Taskcluster defines several environment variables, with the following meanings.

## TASKCLUSTER_ROOT_URL

`TASKCLUSTER_ROOT_URL` is the root URL for the current Taskcluster deployment.
It is set in tasks, and can be read by client libraries using functions like `fromEnvVars`.
It serves as a scope for `TASKCLUSTER_CLIENT_ID`, etc. which only have meaning in a single deployment.

## TASKCLUSTER_CLIENT_ID

`TASKCLUSTER_CLIENT_ID` is the clientId to use for Taskcluster API calls.
This is read by client libraries using functions like `fromEnvVars`.

## TASKCLUSTER_ACCESS_TOKEN

`TASKCLUSTER_ACCESS_TOKEN` contains the accessToken for the clientId given in `TASKCLUSTER_CLIENT_ID`, and is handled in parallel with that variable.

## TASKCLUSTER_CERTIFICATE

`TASKCLUSTER_CERTIFICATE` contains the certificate for the clientId given in `TASKCLUSTER_CLIENT_ID`, and is only present if the client is a temporary client.
This variable is handled in parallel with `TASKCLUSTER_CLIENT_ID`.

## TASKCLUSTER_PROXY_URL

`TASKCLUSTER_PROXY_URL` defines the URL of a local [taskcluster-proxy](https://github.com/taskcluster/taskcluster-proxy) instance that can proxy requests on behalf of the current task.
It is set in tasks when the proxy is enabled.
The URL can be treated like a root URL, but one that does not require any clientId, accessToken, or certificate.
