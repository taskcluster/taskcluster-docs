### Docker Task Definition

   * `docker` image (contains binaries, libc, vim, gcc, ...)
   * Command
   * Env, artifacts, caches, ...

```js
task: { // Image from docker hub
  payload: {
    image: "garndt/custom-ubuntu:latest"
    ...
  }
}

task: { // Image as artifact (from another task)
  payload: {
    image: {
      type:   'task-image',
      taskId: ‘ABC123'
      path:   ‘public/image.tar'
    },
    ...
  }
}
```
