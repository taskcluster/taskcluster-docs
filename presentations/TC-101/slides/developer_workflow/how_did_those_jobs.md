### How did those jobs get there?

<div class="fragment">
    Buildbot<br>

    <ul>
      <li>Push hook - buildbot master</li>
      <li>Job pushed to buildbot worker by buildbot master</li>
      <li>Parent jobs schedule dependent jobs once complete</li>
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
