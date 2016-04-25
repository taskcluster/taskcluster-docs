### Running tasks manually

```
$ sudo npm install taskcluster-cli -g
$ ./mach taskcluster-build --owner=wcosta@mozilla.com \
    --head-repository=https://hg.mozilla.org/mozilla-central
    --head-rev=tip \
    tasks/builds/b2g_flame_kk_opt.yml | \
    taskcluster run-task --verbose
```
