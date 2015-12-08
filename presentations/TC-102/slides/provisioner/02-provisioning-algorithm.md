## Algorithm to figure out if we need more bids

* List all owned Instance and SpotRequests
* Sort them into buckets by state and workerType
* Get the number of pending tasks
* Determine difference between pending tasks and extant capacity
* Submit bids
