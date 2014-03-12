---
layout: default
class:  markdown
---

Task-Graph Storage
==================

All task-graphs are stored in Azure table storage. But at this point we offer
no stable API for reading this table. Visit us at `#taskcluster` if you would
such an API.

It might be possible to define a publicly promised JSON schema for the table
layout. But at this point nothing is promised, all use of the table is at your
own account, we reserve right to break it at any time.