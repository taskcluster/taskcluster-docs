### Task Images

* stored as task artifacts
* tasks define what task ID and image path to use

```js
task: {
  payload: {
    image: {
      type:   'task-image',
      taskId: ‘ABC123'
      path:   ‘public/image.tar'
    },
    ...
  }
```
