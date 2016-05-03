---
layout:       default
class:        html
docson:       true
marked:       true
ejs:          true
superagent:   true
docref:       true
---

<h1>Purge Cache Service</h1>
<p>
  Simple service that publishes a pulse message whenever a request to
  purge a request is received. Workers should listen to the exchange and bind
  with <code>provisionerId</code> and <code>workerType</code>, and when
  a message arrives caches of any type with the given <code>cacheName</code>
  should be purged.
</p>
<p>
    Note, this service is useless if not implemented correctly in workers, so
    refer to worker specific documentation to see if it's supported.
</p>

<div data-doc-ref='https://references.taskcluster.net/purge-cache/v1/api.json'></div>

<div data-doc-ref='https://references.taskcluster.net/purge-cache/v1/exchanges.json'></div>
