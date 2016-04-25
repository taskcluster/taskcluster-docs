---
layout:       default
class:        html
docson:       true
marked:       true
ejs:          true
superagent:   true
docref:       true
---

## Cors-Proxy

[cors-proxy](https://github.com/taskcluster/cors-proxy) is a simple service
to enable taskcluster frontend services to make access remote endpoints that
disallow cross origin requests.

Any website in the
[domain whilelist](https://github.com/taskcluster/cors-proxy/blob/master/server.js#L12)
can make remote requests through cors-proxy.

### Making a request

cors-proxy exposes the `/request` endpoint. You make a POST request to this
endpoint and in the request body, you pass the remote website request
parameters, in [json](http://www.json.org/) format.

```javascript
$.ajax({
  url: 'http://cors-proxy.taskcluster.net/request',
  method: 'POST',
  contentType: 'application/json',
  data: {
    url: 'https://queue.taskcluster.net/v1/ping',
  }
}).done(function(res) {
  console.log(res);
});
```

The request accepts the following parameters, from which only `url` is required.

Paramater            | Description
---------------------|------------
url                  | Remote URL to connect to
method               | One of the http standards [verbs](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)
headers              | Additional http headers to send
data                 | Body text
rejectUnauthorized   | Reject if the https certifcate is not valid. Default: `true`.

#### Exposing headers

By default, the browser allows Javascript code access to only a small set of
response headers. If you want to access one or more headers denied by default,
you can use the `X-Cors-Proxy-Expose-Headers` header. You set it to the list of
headers you want to access, separate by comma. On response, the cors-proxy will
set the [Access-Control-Expose-Headers]() header with the list you passed.
