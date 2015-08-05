Outline:
 - Overview: loosely coupled components
   - Queue:       Tracks state of tasks
   - Provisioner: Provisions a set of workerTypes
   - Workers:     Claims and executes tasks for given workerType
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
     (minimal maintaince, no database admin, etc)
   - Trivial scalability
   - Well-defined APIs and Exchanges
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