### docker (highlights only)

Docker is a container technology (like LXC).

Which gives you "virtual"/isolated:

<ul style="margin-left: 8ex;">
  <li>File-system (copy-on-write)</li>
  <li>Process tree</li>
  <li>Users</li>
  <li>Network</li>
  <li>Memory and CPU...</li>
</ul>

Under the same Linux instance.
<br>

-----

<center>
  Think light-weight virtual machine
  <br>
  <small>or, a very powerful chroot...</small>
</center>

---

### Example `Dockerfile`

```bash
FROM          centos:centos6
MAINTAINER    Jonas Finnemann Jensen <jopsen@gmail.com>

RUN           yum group install "Development Tools"

# Copy in install script and run it
ADD           system-setup.sh   /tmp/system-setup.sh
RUN           /tmp/system-setup.sh

ENV           HOME          /home/worker
ENV           SHELL         /bin/bash
ENV           USER          worker
```

 * Image contains all system libraries
 * Images are layered
