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


Polling for Tasks from a Worker Perspective
===========================================
At a high-level the polling process, from the perspective of the worker, can be
illustrated as follows:

<div class="sequence-diagram-hand" style="margin:auto;">
participant Queue
participant Worker
participant AzureQueue

Worker      ->  Queue       : pollTaskUrls
Queue       --> Worker      : signedPollUrls
Worker      ->  AzureQueue  : get(signedPollUrls[i++ % n])
Note over Worker : Polling signedPollUrls[i++ % n]
AzureQueue  --> Worker      : XML message list
Worker      ->  Queue       : claimTask
Queue       ->  Worker      : status
Note over Worker : Executing task...
Worker      ->  Queue       : reportCompleted
</div>

When a worker want a task it will call
`queue.pollTaskUrls(provisionerId, workerType)` which then returns an array of
URLs we can poll. If we wish to claim multiple message we may append
the parameter `&numofmessages=N` to the poll URLs returned, and we will get
up to `N` messages.
The poll URLs must be polled in the order they are given. When successful the
response will be XML document on the form:

```xml
<QueueMessagesList>
    <QueueMessage>
      <MessageId>...</MessageId>
      <InsertionTime>...</InsertionTime>
      <ExpirationTime>...</ExpirationTime>
      <PopReceipt>...</PopReceipt>
      <TimeNextVisible>...</TimeNextVisible>
      <DequeueCount>...</DequeueCount>
      <MessageText>...</MessageText>
    </QueueMessage>
    ...
</QueueMessagesList>
```

For each `<QueueMessage>` the worker base64 decodes the `MessageText` and
parses it as JSON, this will return an object on the form
`{taskId: ..., runId: ..., signature: ...}`.
After decode the message text the worker proceeds to claim the task as follows:

```js
queue.claimTask(taskId, runId, {
  workerGroup:  '...',
  workerId:     '...',
  messageId:    QueueMessage.MessageId,
  receipt:      QueueMessage.PopReceipt,
  signature:    signature // From JSON parse base64 encoded <MessageText>
});
```

The worker now has a claim to a given `taskId`/`runId`, and must the start the
task while calling `queue.reclaimTask(taskId, runId)`, whenever, `takenUntil`
from the task status structure is about to expire.

**Remark**, if the worker received multiple `<QueueMessage>` entries by calling
`&numofmessages=N`, it must also claim these tasks. This is worker that has
_capacity_ to run multiple tasks in parallel.

When the worker has completed the task successfully it should call
`queue.reportCompleted`. If the task is unsuccessful, ie exits non-zero, the
worker should resolve it using `queue.reportFailed` (this implies test or
build failure). If a task is malformed, the input is invalid, configuration
is wrong, or the worker is told to shutdown by AWS before the the task is
completed, it should be reported to the queue using `queue.reportException`.


Polling for Tasks from a Queue Perspective
==========================================

When task is _scheduled_ the queue will insert a message
`{taskId, runId, signature}` into the appropriate Azure queue. The signature is
a simple `HMAC` over `<taskId>/<runId>` with a secret server side key. It is
used to validate task claims, and reduces the workers ability to mix-up claimed
tasks by accident (or as an attack).

When a worker calls `queue.pollTaskUrls`, the queue will return a list of signed
URLs for the Azure queues for the given `provisionerId` and `workerType`, in
order of priority (when priority is implemented).

When `queue.claimTask` is called, the queue validates the signature attached,
then proceeds to update the Azure queue message with an invisibility timeout
that matches `takenUntil` and a message text on the form
`{taskId, runId: runId + 1, signature: ...}`. This update operation returns a
new `receipt` which is then stored with the `messageId` in Azure Table Storage.

As the worker calls `queue.reclaimTask`, the queue updates the invisibility
timeout of the Azure queue message using the `receipt` and `messageId` stored
in Azure Table Storage. However, if a worker failed to reclaim a task on time,
the `receipt` will have expired and it will be impossible to `reclaim` the run.
Instead the Azure queue message will become visible, and a any worker may now
poll for it. Remember that we modified the message text to have `runId + 1`.

The practice of updating the message text and using the Azure queue message to
enforce `takenUntil`, means that we don't need a background process to query
for expired claims. It is also feasible to have a lower claim expiration
timeout, and recovery from this timeout will be immediate. However, it does
complicate the queue implementation as we will have to resolve lower `runId`s
as `exception` due to `claim-timeout`, whenever, a task is claimed. The queue
will also be less flexible to future changes in this flow, as we're dependent
on Azure queue feature.

**Security Concerns**, when returning a signed URL for polling the underlying
Azure queue in `pollTaskUrls`, we will generate a URL that signed with a SAS
signature which allows the worker to get and delete messages from the Azure
queue. Hence, it seems that these permissions allows a single worker to obstruct
**all tasks** for the given `provisionerId` and `workerType`; this seems like
an acceptable isolation level. If we one day have workers that are less trusted
we can implement an API end-point that polls the underlying Azure queue, hence,
we don't have trust the worker to do this. As always all API end-points will
be protected by different scopes.

Transitioning to new Implementation
===================================
In the future `queue.claimTask` will require options `messageId`, `receipt`,
and `signature`. However, these will initially be optional, and then when we're
ready to move away from using postgres they will be come mandatory.
Giving various `workerType`'s plenty of time to migrate, say at least a week or
two.