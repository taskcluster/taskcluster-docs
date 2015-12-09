### Task Definition

Before:

```
image: '{{#docker_image}}builder{{/docker_image}}'
```

After:

```
image:
  type: 'task-image'
  path: 'public/image.tar'
  taskId: '{{#task_id_for_image}}builder{{/task_id_for_image}}'
```
