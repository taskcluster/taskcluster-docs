### Docker Tips

* Volume Mount
  * -v <host dir>:<container dir>
  * Uses
    * Mount local source checkout
    * Keep cached copies of object directory and tc-vcs checkouts
* Space issues
  * use '-rm' to remove container after completion
* Enter running container
  * use 'docker exec -it <container id> /bin/bash'

Example:

```bash
cid=$(docker run \
  -rm \
  -d \
  -v /Users/nobody/repos/gecko/:/gecko \
  ubuntu:14.04 \
  sleep 60)

docker exec -it $cid /bin/bash
```
