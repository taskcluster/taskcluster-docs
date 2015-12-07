### Taskcluster local environment

* Split from docker-worker vagrant environemtn
* Configures similar environment that runs in production
  * same ubuntu version
  * kernel modules for loopback devices
  * docker version
* Home directory synced

```bash
git clone http://www.github.com/taskcluster/taskcluster-docker-environment
cd taskcluster-docker-environment
vagrant up
vagrant ssh
docker run -it ...
```

