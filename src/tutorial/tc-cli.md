---
title: TaskCluster CLI
---

[TaskCluster CLI](https://github.com/taskcluster/taskcluster-cli) allows users to control and get information from tasks within TaskCluster.

We'll see how to get the tool and then how to use it.

## Getting the tool

The first step is to get the tool. You have two options to get a binary. The first option is to download pre-compiled binaries from github, and the second is to compile it from the source. We'll explore that first option. The latest binary is attached to the [latest release](https://github.com/taskcluster/taskcluster-cli/releases/latest) on github.

### Linux

On linux, you need to add the binary to a folder on your path, and ensure that it is executable. You may have to run some commands as root or with `sudo`.

```
# download the binary for your OS and architecture and save it as taskcluster
$ chmod +x taskcluster
$ mv taskcluster /usr/local/bin
```

## Authenticating

The next step is to authenticate yourself. In a command line, run the following command. It will open a browser window and guide you through authenticating your taskcluster installation.

```
$ taskcluster signin
```

## Common tasks
