import os
import taskcluster

queue = taskcluster.Queue({"credentials": {
    "clientId":    os.environ["TASKCLUSTER_CLIENT_ID"],
    "accessToken": os.environ["TASKCLUSTER_ACCESS_TOKEN"],
}})

taskId, taskGroupId = taskcluster.slugId(), taskcluster.slugId()

task = queue.createTask({
    "created":  queue.Time(time.Now()),
    "deadline": queue.Time(time.Now().AddDate(0, 0, 1)),
    "expires":  queue.Time(time.Now().AddDate(0, 1, 0)),
    "payload": {
        "command": [ ... ],
        "maxRunTime": 7200,
    },
    "retries":  1,
    ...
}, taskId=taskId)
