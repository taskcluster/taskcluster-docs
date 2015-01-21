---
layout:             default
class:              markdown
sequence_diagrams:  true
---

Queue - Worker Interaction (draft)
==================================
This document outlines a how queue and worker can interact, and how Azure Queue
Storage queues participates in this interaction. We refer to TaskCluster Queue
simply as _queue_, where as Azure Queue Storage queues, will be referred to as
_Azure queues_.


Polling for Tasks
=================
The simplest way to poll for tasks is to call `claimWork` on the queue.
The queue will then poll the underlying Azure queue, and claim a task for you
if one is available. However, this won't well if a lot of workers are
constantly polling the queue.

**Proposal,** the queue could track number of `claimWork` requests per 10s, and
return exponentially large back-off times to workers. Though this is complicated
to implement.

The efficient way to poll for tasks is to call `pollTaskUrl`. This returns a
signed URL for an Azure queue that you can poll for tasks
(Azure queues can handle 2k req. / s). The signed Azure queue URL will return
XML, the worker does not need to parse this XML. Just grep the response text
for `<MessageId>`. If the response text contains this string, the response text
is given to `claimWork` which will then claim the task for you.

**Maintaining `takenUntil`**, in practice `claimWork` will check for the
property `xmlMessage`, if not present `claimWork` will poll Azure queue. But if
an `xmlMessage` is present, it'll be parsed and assumed to be the response text
from a request to the underlying Azure queue. The queue will then use the
`messageId` and `popReciept` to update the Azure queue message with a new
payload where the `runId` is incremented by one. The queue will then store the
new Azure queue `messageId` and `popReciept` which can be used to update the
message in the Azure queue, whenever the worker reclaims the task.
This way as soon as `takenUntil` expires a message with `runId + 1` will be
available in the underlying Azure queue. This should do away with part of the
reaper process that deals with `takenUntil`, and make shorter `takenUntil`
intervals more feasible (we'll always have the overhead of proxying them).

**Transistioning**, while still using postgres, and in the process of migrating
to Azure Table Storage, the queue will delete the Azure queue message when it
is received in `claimWork`. It will still use the Azure queue message
(the `xmlMessage` property) to find a pending task. But it will not update the
Azure queue message and rely on it for maintaining `takenUntil`.

**Security Concerns**, when returning a signed URL for polling the underlying
Azure queue in `pollTaskUrl`, we will generate a URL that signed with a SAS
signature which allows the worker to get and delete messages from the Azure
queue. There is also the concern that the worker could falsify the `xmlMessage`
it uploads to `claimWork`, this can be partially mitigated by including a
signature in the task message. But it seems that these permissions only allows
a worker to screw up **all tasks** for the given `provisionerId` and
`workerType`; this doesn't seem unacceptable.

