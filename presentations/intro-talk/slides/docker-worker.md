### Payload for docker-worker

<pre><code class="js hljs" style="max-height: none;">task.payload = {
  image:            "taskcluster/builder:0.5.6",
  command:          ["/usr/local/bin/build-script.sh"],
  env: {
    "REPOSITORY":   "https://hg.mozilla.org/",
    "REVISION":     "0ecdc08f4f0a..."
  },
  maxRunTime:       3600,
  cache: {          // Cache folders to mount in container
    "obj-dir":      "/home/worker/obj-dir",
    "hg-clone":     "/home/worker/source"
  },
  artifacts: {      // Artifacts to copy out of container
    "binary.zip":   "/home/worker/binary.zip"
  },
  features: {       // Worker plugins/features to activate
    livelog:        true,
    interactive:    true
  },
}
</code></pre>

---

### Local Reproducibility

<pre><code class="bash hljs" style="max-height: none;"># pull down the image
docker pull taskcluster/builder:0.5.6

# Run task command in container, with env vars and caches
docker run  \
  -name task-container \                      # container name
  -e REPOSITORY="https://hg.mozilla.org/" \   # env variable
  -e REVISION="0ecdc08f4f0a..." \
  -v /mnt/obj-dir:/home/worker/obj-dir \      # cache
  -v /mnt/hg-clone:/home/worker/source \
  taskcluster/builder:0.5.6 \                 # image
  /usr/local/bin/build-script.sh              # command

# Copy artifacts from container
docker cp task-container:/home/worker/binary.zip binary.zip

# Clean up the container
docker rm task-container;
</code></pre>

