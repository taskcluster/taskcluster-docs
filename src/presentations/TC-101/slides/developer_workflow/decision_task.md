### Taskcluster Decision Task

* Determines what should get run and when.
```
mach taskcluster-graph <flags>
```
* Constructs JSON payload
* Worker extends the graph with this object
```
{
  tasks: [
    {
      taskId:     "XgvL0qtSR92cIWpcwdGKCA",
      requires:   [],
      reruns: 3,
      task: {...}
      ...
    },
    {
      taskId:     "73GsfK62QNKAk2Hg1EEZTQ",
      requires:   ["XgvL0qtSR92cIWpcwdGKCA"],
      task: {
        payload: {...}
        ...
      },
    }
  ]
}
```
