### Taskcluster local environment

* Configures similar environment that runs in production
  * same ubuntu version
  * kernel modules for loopback devices
  * docker version
* Home directory synced

```bash
git clone http://www.github.com/taskcluster/docker-worker
cd docker-worker
vagrant up
vagrant ssh
docker run -it ...
```
