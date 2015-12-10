    # The version is always required
    version: 0
    # Top level metadata is always required
    metadata:
      ...
    tasks:
      - provisionerId: "{{ taskcluster.docker.provisionerId }}"
        workerType: "{{ taskcluster.docker.workerType }}"
        extra:
          github:
            env: true
            events:
              - pull_request.opened
              - pull_request.synchronize
              - pull_request.reopened
        payload:
          maxRunTime: 3600                          # Job timeout, in seconds
          image: "quay.io/mrrrgn/ubuntu-ci:0.0.1"   # Our docker container (if using docker)
          command: ["/bin/bash", "-c", "echo hi"]   # A command to run, list entries are arguments
        # Each task also requires explicit metadata
        metadata:
          ...
