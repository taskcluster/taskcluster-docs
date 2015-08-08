TODO:
 - Notes
 - Picture of a toaster
 - Integrating Add-on Services (RabbitMQ + task.extra)
 - screenshot docs




### A TaskExecution Platform
 - I'm Jonas
 - Work at Mozilla
 - where been working on TaskCluster
 - for the past year and half
   (actually started back when Taras was my manager)

### Outline
 - Why TaskCluster (and not BuildBot or Jenkins)
 - Architecture (components and how they talk to each other)
 - Tasks and task-graphs (what they are, how we use them)
 - WorkerTypes and life-cycle (which worker types we have)
 - docker-worker (little detail on primary work horse)
 - Service Design (how we write services -- make things reliable)
 - Compare BuildBot/Jenkins (what benefits we get architecturally)
 - TaskCluster in Numbers (fancy graphs/stats from Mozilla)
 - Questions...

My goal: is to give an high-level view of
         - What setup w. TC looks like
         - How it's different
         - and some of the cool features..

### Why taskcluster? (1)
 - Go back - look at alternatives
 - Many stories I've heard, you either:
     A) Have a setup with a box for each developer (nobody has same config)
     B) Central setup (owned by a single team, developers locked out)
        - Often owned by a team of (Release Engineers + Ops)
 - With BB/Jenkins you need staging envs to test new config
   - These are hard
   - Complicated BB/Jenkins setups aren't just deploy
   - You may have pools with special hardware (phones)
 - Can't put on slides -- At Mozilla we have a lot of people maintain BB
                          without getting much done.
                          (good people, but it's hard to refactor)
 - There is a tight coupling between:
   * test cases <-> source code
   * test cases <-> project configuration
     (chunking, dependencies... job triggered)
 - Example:
    * changing chunking may cause test cases to fail
    * Say 1k test cases, two tasks, change to 3 tasks for added parallelism!
    * not ideal, but a reality... test cases have conflicts!
      (releng aren't experts on fixing tests)

### Why taskcluster? (1)
 - TC is about putting configuration in-tree
 - You get:
    * Changes is like making a patch
    * No need for staging environments
    * Config changes are tracked in revision history
    * You run tests for old commits
      (as long as the infrastructure still exists)
    * Easier to have long-term support branches


### Components
 - Set of loosely coupled components
   Queue:
    - Tracks state of tasks
    - Manages artifacts
    - Controls who can submit tasks
   Workers:
    - Typically EC2 spot nodes (cheap)
    - But we can add any cloud or internet device
      (toasters or raspberry pies)
   Process tasks:
    - worker processes tasks
    - Claim task -> process -> upload to S3
    - Queue controls access to S3 via. signed URLs
    - Queue ensures expiration of artifacts
      (allows you to list artifacts)
   Provisioner:
    - Ask for number pending tasks -> spawns nodes
    - Can have multiple independent provisioners
      (for different workerTypes - provisionerId)
    - If you have hardware -- you don't have provisioner
   RabbitMQ:
    - For any event -> publish message
    - task specific routing keys
      RabbitMQ: Pub/Sub filter with routing keys
    - Useful for external integration (update dashboard)
      (we also use it internally)
   Scheduler:
    - Accepts task-graphs
    - Tracks state of tasks in task-graph
    - Ensures dependent tasks are scheduled
   Developers:
    - Push code to trigger task-graph creation
    - Can also call APIs directly for experiments
      (all self-serve)

### Task Definition
  Let's look at a task definition
  - TaskId
  - deadline, various meta-data (not here)
  - custom routing keys (for messages)
  - provisionerId / workerType -> ids pool of workers
  - task.payload which workerType specific
 Queue:
  - Tracks state
  - Manages retries (if spot nodes die)
  - Resolves tasks if deadline exceeded
  - Publish messages for events
  - Allows correct workerType to claim
 docker-worker: (in this case)
  - validates the payload
  - fails the task if invalid (with a log)
  - image, env, command -> to docker
  - copy out file from the container


### Task-Graph
  - Push to a repository
  - Post commit-hook -> task-graph w. decision task
  - Decision task creates the task-graph
  - All project configuration is in decision task
    (So you can script which tasks to run)
  - in-tree decision task can get complicated
    (refactoring it needs no staging env)
    (and you could try to use declarative things, YAML/JSON)

### WorkerTypes
 - all task have provisionerId/workerType
 - provisionerId/workerType => pool of workers
 - This gives us a lot of flexibility:
    (because everything talks over web APIs, we can different worker impl.)
    - docker-worker: node, runs tasks under docker (task specific image)
    - generic-worker: go, runs tasks under temp user account (windows)
    - buildbot-bridge: python, runs tasks in BB and reports result back

 - Gradual migration of tasks:
    - to new workerTypes
    - or a new provisioner
    - Useful when:
      - moving to a new window version,
      - rolling out new hardware that you want to test again
        (as you can maintain the old tests until the new stuff is reliable)
 - Isolation for security:
    - Normal build machine are different from release machines
      (especial for us, as we have community members pushing to test machines)
    - Isolation also facilitates self-service
      (as you can allow people to abuse a specific workerType)
 - Separate build/test machines
    - build machines are big lots of CPU
    - test machines are smaller (at mozilla)
    - caches hot on build machines
    - support special test machines with special hardware like phones


### WorkerType Life-Cycle
 * provisioner brings the worker to life
 * provisioner shuts it down eventually... (so no health monitoring)
 * If fixed hardware, no provisioner, and no shutdown (might need health monitor)
 * Note:
    - Not controlled by external entity
    - Don't have to register anywhere (must have creds)
    - Comes to life -> not directly by the queue
    - Anything can be a worker
    - worker under desk for prototyping
      (doesn't interfere with TC)

### Docker (highlights only)
 - copy-on-write FS
 - much less overhead
 - no hardware support needed (runs on EC2)
 - (hopefully) you can't break out of the container
 - CHEAP to reset (we do it between tasks)

### Example Dockerfile
 - Use this to build an image
 - Ships with all system libraries, compilers, etc
 - Images are layered
 - You can build and test images locally
   (can't do that with an AMI)

### Payload for docker-worker
 - image/command/env
 - maxRunTime
 - caches that persist between tasks
 - artifacts are copied out of container
 - features/plugins


   - Flow of task exeuction: polling, claimTask, docker pull, docker run, upload-artifacts, reportCompleted
   - Live log stream directly from worker
     (When task is started, artifact -> redirect to HTTP on worker -> stream log)
     (No round-tripping the log over some fragile service in the middle)
   - Interactive sessions in a task
     (get-artifact -> redirect websocket on worker -> pipe in stdin, get stdout)
     (if program is bash, you have ssh-like interaction)
     (if program is cat filename, you are downloading a file)
   - Example of a task
     (Use example from the tutorial)
     (Show example dockerfile -> docker push -> hub.docker.com too)
   - Local reproducibility
     (use same docker image)
     (save docker container as image after running, for debugging)

### LiveLogging (1)
 - No overhead if not used
 - travis sends all log messages over RabbitMQ

### Interactive Sessions
 - Very low overhead if not used
 - No filing bugs to get a loaner

### Service Design (1)
 - Auto-gen client libraries
   (python, node, browser, go, java)

### Service Design (2)
 - No database
 - Azure table storage is cheap
   - storage is 0.12 / GB
   - up to 500TB

### Self-Serve APIs
 - Build dashboards

### Self-Serve Use-Cases
 - Run one-off tasks (new docker image, upgraded compiler)
 - Run a single tasks to identify intermittent failures
   (start interactive session)
 - Tweak task-graph manually for experimentation
 - Bisect revisions

### TaskCluster in Numbers
 - Probably over provisioning

