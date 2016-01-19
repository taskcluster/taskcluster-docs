---
layout:             default
class:              markdown
sequence_diagrams:  true
---

Queue - Worker Interaction
==========================
This document outlines a how queue and worker interacts, through-out the
life-cycle of a task on its way to resolution. This document serves to ease the
implementation of workers, and focuses on interaction with Azure queues as most
other API methods are documented in the API reference.


Polling Azure Queues for Tasks
------------------------------
At a high-level the polling process, from the perspective of the worker, can be
illustrated as follows:

<div class="sequence-diagram-hand" style="margin:auto;">
participant Queue
participant Worker
participant Azure Queue

Worker      ->  Queue       : pollTaskUrls
Queue       --> Worker      : signedPollUrls
Worker      ->  Azure Queue  : get(signedPollUrls[i++ % n])
Note over Worker : Polling...
Azure Queue --> Worker      : &lt;QueueMessagesList/&gt;
Worker      ->  Queue       : claimTask
Queue       --> Worker      : status
Worker      ->  Azure Queue : Delete &lt;PopReceipt/&gt;
Note over Worker : Executing task...
Worker      ->  Queue       : reportCompleted
</div>

When a worker wants to poll for pending tasks it must call
`queue.pollTaskUrls(provisionerId, workerType)` which then returns
an array of objects on the form `{signedPollUrl, signedDeleteUrl}`. Each of
these objects represent an underlying Azure queue, there are multiple of these
so that we can support priority. For this reason the worker must poll the
Azure queues in order they are given.

To poll an Azure Queue the worker must do a `GET` request to the `signedPollUrl`
from the object, representing the Azure queue. To receive multiple messages at
once the parameter `&numofmessages=N` may be appended to `signedPollUrl`. The
parameter `N` is the maximum number of messages desired, `N` can be up to 32.

When executing a `GET` request to `signedPollUrl` from an Azure queue object,
the request will return an XML document on the form:

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

If there is no messages in the `<QueueMessagesList>` tag, the worker should try
polling using `signedPollUrl` from the next Azure queue object. If at end of
the array, the worker should sleep a second or so, and start polling from the
start of the list.

If there is one or more messages the worker must claim the tasks referenced in
the messages, and delete the messages. To find the task referenced in a message
the worker must base64 decode and JSON parse the contents of the
`<MessageText>` tag. This would return an object on the form: `{taskId, runId}`.

Using the `taskId` and `runId` from the `<MessageText>` tag, the worker must
call `queue.claimTask()`. If the `queue.claimTask()` operation is successful or
fails with a 4xx error, the worker must delete the messages from the
Azure queue.

Messages are deleted from the Azure queue with a `DELETE` request to the
`signedDeleteUrl` from the Azure queue object returned from
`queue.pollTaskUrls`. Before using the `signedDeleteUrl` the worker **must**
replace the placeholder <code>{<span>{messageId}</span>}</code> with the
contents of the `<MessageId>` tag.
It is also necessary to replace the placeholder
<code>{<span>{popReceipt}</span>}</code> with the
URI encoded contents of the `<PopReceipt>` tag.

Notice, that the worker **must** URI encode the contents of `<PopReceipt>` before
substituting into the `signedDeleteUrl`. Otherwise, the worker will experience
intermittent failures. Also remark that the worker **must** delete messages if the
`queue.claimTask` operations fails with a 4xx error. A 400 hundred range error
implies that the task wasn't created, not scheduled or already claimed, in
either case the worker should delete the message as we don't want another
worker to receive message later.

Notice, that failure to delete messages from Azure queue is serious, as it
wouldn't manifest itself in an immediate bug. Instead if messages repeatedly
fails to be deleted, it would result in a lot of unnecessary calls to the
queue and the Azure queue. The worker will likely continue to work, as the
messages eventually disappears when their deadline is reached.
However, the provisioner would over-provision aggressively as it would
be unable to tell the number of pending tasks. And the worker would spend a lot
of time attempting to claim faulty messages.

For these reasons outlined above it's strongly advised that workers logs
failures to delete messages from Azure queues. And that workers reads the
value of the `<DequeueCount>` and logs messages that alerts the operator if
a message has been dequeued a significant number of times. For example more
than 10.

Reclaiming Tasks
----------------
When the worker has claimed a task, it's said to have a claim to a given
`taskId`/`runId`. This claim has an expiration, see the `takenUntil` property
in the _task status structure_ returned from `queue.claimTask` and
`queue.reclaimTask`. A worker must call `queue.reclaimTask` before the claim
denoted in `takenUntil` expires. It's recommended that this attempted a few
minutes prior to expiration, to allow for clock drift.


Dealing with Invalid Task Payloads
----------------------------------
If the task payload is malformed or invalid, keep in mind that the queue doesn't
validate the contents of the `task.payload` property, the worker may resolve the
current run by reporting an exception. When reporting an exception, using
`queue.reportException` the worker should give a `reason`. If the worker is
unable execute the task specific payload/code/logic, it should report
exception with the reason `malformed-payload`.

This can also be used if an external resource that is referenced in a
declarative nature doesn't exist. Generally, it should be used if we can be
certain that another run of the task will have the same result. This differs
from `queue.reportFailure` in the sense that we report a failure if the task
specific code failed.

Most tasks include a lot of declarative steps, such as poll a docker image,
create cache folder, decrypt encrypted environment variables, set environment
variables and etc. Clearly, if decryption of environment variables fail, there
is no reason to retry the task. Nor can it be said that the task failed,
because the error wasn't caused by execution of Turing complete code.

If however, we run some executable code referenced in `task.payload` and the
code crashes or exists non-zero, then the task is said to be failed. The
difference is whether or not the unexpected behavior happened before or after
the execution of task specific Turing complete code.


Terminating the Worker Early
----------------------------
If the worker finds itself having to terminate early, for example a spot node
that detects pending termination. Or a physical machine ordered to be
provisioned for another purpose, the worker should report exception with the
reason `worker-shutdown`. Upon such report the queue will resolve the run as
an exception and create a new run, if the task has additional retries left.


Reporting Task Result
---------------------
When the worker has completed the task successfully it should call
`queue.reportCompleted`. If the task is unsuccessful, ie. exits non-zero, the
worker should resolve it using `queue.reportFailed` (this implies test or
build failure). If a task is malformed, the input is invalid, configuration
is wrong, or the worker is told to shutdown by AWS before the the task is
completed, it should be reported to the queue using `queue.reportException`.
