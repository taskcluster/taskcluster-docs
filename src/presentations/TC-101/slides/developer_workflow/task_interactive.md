### Interative Feature

* Allows shell access to running task container
  * Proxied websocket to 'docker exec'
* interactive.html artifact redirects to website with terminal
  * Must be logged in and have scopes for get the private/docker-worker/interactive.html artifact
* Enabled by setting worker feature flag

```js
"payload": {
    ...
    "features": {
        "interactive": true
    }
}
```
<center>
<img
  src="slides/developer_workflow/images/interactive.png"
  style="border: none;"
/>
</center>
