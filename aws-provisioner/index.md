---
layout:   default
class:    markdown
docson:       true
marked:       true
ejs:          true
superagent:   true
docref:       true
---
AWS Provisioner
===============
The AWS provisioner is identified with `aws-provisioner-v1` as the
`provisionerId`, provisions EC2 spot instances. Its administrative interface is
available at
[tools.taskcluster.net/aws-provisioner/](https://tools.taskcluster.net/aws-provisioner/),
use this interface to configure and register new `workerType`s.

It is your responsibility to ensure that a worker starts on the AMI when the AMI
boots that this worker understand the task payload and shutsdown when no more
tasks is available from the queue, **enjoy!**

External Links
--------------
 * [AWS Provisioner Web Interface](https://tools.taskcluster.net/aws-provisioner/)
 * [AWS Provisioner repository](https://github.com/taskcluster/aws-provisioner)
