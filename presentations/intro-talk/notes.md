TODO:
 + Why taskcluster?
 + Kleene Scopes
 + Self-Serve APIs (scopes)
 - Integrating Add-on Services (RabbitMQ + task.extra)
 + TaskCluster in Contrast to BuildBot/Jenkins
 + TaskCluster at Mozilla (number of tasks, median task pending time)
 + Conclusion
   (TC is a PaaS, self-serve, config in-tree, devs can touch config - not infra)

Outline:
 - Overview: loosely coupled components
   - Queue:       Tracks state of tasks
   - Workers:     Claims and executes tasks for given workerType
   - Provisioner: Provisions a set of workerTypes
   - Pulse:       RabbitMQ pub/sub for all events
   - Scheduler:   Schedules dependent tasks
 - Workers:
   - No controller, workers control themselves
   - worker shutdown themselves
   - docker-worker (node) runs tasks in a docker container (linux)
   - generic-worker (go) run tasks under a temporary user account (windows)
   - BuildBot Bridge (python)
   - Future: We'll might do an hsm-worker for signing...
 - docker-worker: Execution of a Task
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

 - Service Architecture (Queue)
   - Scalability through Azure Storage and S3
     (minimal maintenance, no database admin, etc)
   - Trivial scalability
   - Well-defined APIs and Exchanges (JSON schema)
   - Authorization with Scopes
 - Index: Hooking-Up Extra Services
   - RabbitMQ (Pulse)
     (exchanges and routing keys example)
     (listen for tasks completed with given workerType)
   - Custom routing keys (task.routing)
     (Adding a custom route)
     (listen to index.# route -> insert into index)
   - Informal data (task.extra)
     (can be used for various meta-data, e.g. whether to overwrite existing indexed tasks)
 - TaskCluster in contrast to BuildBot/Jenkins
   - Design: Platform as a Service
     (extremely loose coupling between execution of tasks and definition of tasks)
     (example: docker-worker tasks ships with their runtime environment)
   - Task-Graphs mixing different workerTypes
   - Self-serve APIs
     - You can even deploy your own workerType
     - Submit custom tasks
     - Have credentials scoped appropriately
     - You can fork our UI (static HTML + javascript)
   - Gradual Migration between workerTypes
     - even services like index
     - we did with provisioner (aws-provisioner-v1 -> aws-provisioner-v2)
   - Server-side config discouraged
     - obviously, for generic-worker we might have to install dependencies on the VM
     - You can also setup special case workers
   - Everything is available through APIs (which works in the browser)
 - TaskCluster at Mozilla
   - B2G
   - x k tasks per day
   - x hours of execution per day
   - Average task Pending time
   - Efficiency numbers
 - Questions
   (btw, we're hiring)




Problem Statement


Integrating Add-on Services:
 - RabbitMQ (custom routing keys)
 - `task.extra` free-form data attachment
 - Example: taskcluster-index that allows you to find tasks

TaskCluster in Contrast to BuildBot/Jenkins
 - Self-serve REST APIs
 - First class task-graph concept
 - Minimal server-side project configuration (No central controller)

TaskCluster at Mozilla
 - task pending time: max 11min, less than 30s
 - Number of tasks per day
 - Number of compute hours per day
















### A TaskExecution Platform
 - I'm Jonas
 - Work at Mozilla
 - where been working on TaskCluster
 - for the past year and half

### Outline
 - Why TaskCluster (and not BuildBot or Jenkins)
 - Architecture (components and how they talk to each other)
 - Tasks and task-graphs (what they are, how we use them)
 - WorkerTypes and life-cycle (which worker types we have)
 - docker-worker (see what it does)
 - Service Design (how we write services -- make things reliable)
 - Compare BuildBot/Jenkins (what benefits we get architecturally)
 - TaskCluster in Numbers (fancy graphs/stats from Mozilla)
 - Questions...

    //  - Add-on Services (how to integrate w. reporting, or index tasks)

### Why taskcluster? (1)
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
    * not ideal, but a reality (because you can't test all combinations)
    * In BB/Jenkins: You need staging setup; switch-over is non-trivial
    * In TC: Changes to config can be merged like any patch
      (You never need to replicate the entire setup in a staging environment)


### Why taskcluster? (1)
 - TC is about putting configuration in-tree
 - You get:
    * Changes is like making a patch
    * No need for staging environments
    * Config changes are tracked in revision history
    * You run tests for old commits
      (as long as the infrastructure still exists)


TaskCluster:
    Eng                   | RelEng
    tests                 |
    code                  |  scaling of VMs
    tasks                 |  expiration of artifacts
    scheduling            |  setup new runtime environment
    chunking              |  (infrastructure)
    choice of runtime env |
(The concept of projects/branches from jenkins is purely a user-side thing in TC)



### Components

### Task Definition

### Task-Graph


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
    - support special test machines with special hardware like phones


### WorkerType Life-Cycle
 * provisioner brings the worker to life
 * provisioner shuts it down eventually... (so no health monitoring)
 * If fixed hardware, no provisioner, and no shutdown (might need health monitor)
 * Note: not controlled by external entity

### Docker (highlights only)
 - copy-on-write FS
 - much less overhead
 - no hardware support needed (runs on EC2)
 - (hopefully) you can't break out of the container
 - CHEAP to reset (we do it between tasks)

### Example Dockerfile
 - Ships with all system libraries, compilers, etc
 - lightweight virtual machine
 - You can build and test images locally (can't do that with an AMI)

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


### Self-Serve APIs
 - Build dashboards
 - Run one-off tasks
 - Tweak task-graph manually for experimentation
 - Bisect revisions
 - Run a single tasks to identify intermittent failures
