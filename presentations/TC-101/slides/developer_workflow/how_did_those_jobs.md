### How did those jobs get there?

<div class="fragment">
    Buildbot<br>

    <ul>
      <li class="fragment">Push hook - buildbot master</li>
      <li class="fragment">Job pushed to buildbot worker by buildbot master</li>
      <li class="fragment">Parent jobs schedule dependent jobs once complete</li>
    </ul>

<div class="fragment">
    <hr>
    TaskCluster<br>
    <ul>
      <li class="fragment">Pushlog polling (mozilla-taskcluster)</li>
      <li class="fragment">Decision Task created - in-tree task definition</li>
      <li class="fragment">All tasks defined - parent tasks scheduled</li>
      <li class="fragment">Dependent tasks scheduled once parents successful complete</li>
    </ul>
</div>
