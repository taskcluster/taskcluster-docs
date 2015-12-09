### Example Dockerfile

Location: testing/docker/builder/Dockerfile

```
FROM          quay.io/mozilla/b2g-build:0.2.9
MAINTAINER    Dustin J. Mitchell <dustin@mozilla.com>

ENV PYTHONPATH /tools/tools/lib/python:$PYTHONPATH
ENV TOOLTOOL_CACHE  /home/worker/tools/tooltool-cache

ADD https://raw.githubusercontent.com/taskcluster/buildbot-step/58a16f7370a8b4de7a4458436a4a5fad9905f5d9/buildbot_step.js /home/worker/bin/buildbot_step

# Let's install wget
RUN apt-get update && apt-get install -y wget

...
```

