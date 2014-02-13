---
layout:   default
class:    markdown
---
AWS Provisioner
===============
The AWS provisioner identified with `aws-provisioner` as the `provisioner-id`,
and AMI image identifier as `worker-type`.

| `provisioner-id`  | `worker-type`      |
|-------------------|--------------------|
| `aws-provisioner` | Any AMI identifier |

When a task with this `provisioner-id` is pending a spot-request for an instance
with AMI identifier given as `worker-type` will be requested. It is your
responsibility to ensure that a worker starts on the AMI when the AMI boots
that this worker understand they task payload and shutsdown when no more tasks
is available from the queue, **enjoy!**

As be we formalize things later, this will become less dynamic, and new AMIs
will have to be registered with the provisioner by an authorized user. This will
also allow us to associated JSON schemas for task payloads with `worker-type`s.

External Links
--------------
 * [AWS Provisioner Web Interface](http://aws-provisioner.taskcluster.net/)
 * [AWS Provisioner repository](https://github.com/taskcluster/aws-provisioner)