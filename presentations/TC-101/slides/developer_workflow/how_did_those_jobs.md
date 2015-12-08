### How did those jobs get there?

<div class="fragment">
    Buildbot<br>

    <ul>
      <li>ChangeSources - push/poll repo</li>
      <li>Schedulers - process Change objects from ChangeSources</li>
      <li>BuildRequests - pending jobs</li>
      <li>Scheduler configuration determines what happens in response to a push</li>
    </ul>

<div class="fragment">
    <hr>
    TaskCluster<br>
    <ul>
      <li>Pushlog polling (mozilla-taskcluster)</li>
      <li>Decision Task created - in-tree task definition</li>
      <li>All tasks defined - parent tasks scheduled</li>
      <li>Dependent tasks scheduled once parents successful complete</li>
    </ul>
</div>
