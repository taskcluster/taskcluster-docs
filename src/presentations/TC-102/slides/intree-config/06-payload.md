### Payload

* Payload is worker specific
* Here I am using docker-worker tasks as an example

```
payload:
  image: taskclusterprivate/phone-builder:0.0.22
  maxRunTime: 3600

  artifacts:
    private/build:
      expires: '2016-11-26T15:00:22.195275Z'
      path: /home/worker/artifacts/
      type: directory
    public/build:
      expires: '2016-11-26T15:00:22.195331Z'
      path: /home/worker/artifacts-public/
      type: directory

  cache:
    tc-vcs: /home/worker/.tc-vcs

  env:
    GECKO_BASE_REPOSITORY: http://hg.mozilla.org/mozilla-central
    GECKO_HEAD_REV: tip
```
