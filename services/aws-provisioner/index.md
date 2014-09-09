---
layout:   default
class:    markdown
---
AWS Provisioner
===============
The AWS provisioner is identified with `aws-provisioner` as the `provisionerId`,
provisions EC2 spot instances. Its administrative interface is hosted at
[aws-provisioner.taskcluster.net](http://aws-provisioner.taskcluster.net), use
this interface to configure and register new `workerType`s.

It is your responsibility to ensure that a worker starts on the AMI when the AMI
boots that this worker understand the task payload and shutsdown when no more
tasks is available from the queue, **enjoy!**

External Links
--------------
 * [AWS Provisioner Web Interface](http://aws-provisioner.taskcluster.net/)
 * [AWS Provisioner repository](https://github.com/taskcluster/aws-provisioner)
