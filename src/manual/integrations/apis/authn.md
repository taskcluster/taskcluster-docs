---
title: Authentication
order: 1
---

Authentication (Who Are You?)
-----------------------------

To access protected resources, a TaskCluster client must have credentials
consisting of a `clientId` and an `accessToken` (and, if using temporary
credentials, a `certificate`).

These credentials are used with the Hawk protocol to authenticate each HTTP
request. The `clientId` is passed as the `id` parameter, and `accessToken` is
passed as the `key` parameter.

If given, the certificate is passed as `ext.certificate` to the
`Hawk.client.header` method. In JavaScript:
```js
var header = Hawk.client.header('https://foo.taskcluster.net', 'GET', {
  credentials: {
    clientId: clientId,
    accessToken: accessToken,
  },
  ext: new Buffer(JSON.stringify({certificate: certificate})).toString('base64'),
});
```

**Remark**, it is possible to [restrict authorized scopes](authorized-scopes)
using the `ext` in combination with the certificate for a set of temporary
credentials. Just include both fields in the JSON object before base64 encoding
into the `ext` property.

Given this information, the hawk protocol (as defined by its JS implementation)
signs the HTTP request, and the resulting token is placed in the
`Authorization` header.
