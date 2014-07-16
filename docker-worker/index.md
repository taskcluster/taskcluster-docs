---
layout:       default
class:        markdown
docson:       true
---

# Docker Worker

This worker is designed to handle tasks on linix via
[docker](http://www.docker.com/).

The worker being based on docker allows you to execute just about any task that
runs on linux in a portable fashion (i.e you can run it locally, on another CI
system, etc...) with none to minimal taskcluster specifics built into your images.

## Queue `.payload` schema

<div data-render-schema="http://schemas.taskcluster.net/docker-worker/v1/payload.json"></div>

## Queue `result` schema

<div data-render-schema="http://schemas.taskcluster.net/docker-worker/v1/result.json"></div>
