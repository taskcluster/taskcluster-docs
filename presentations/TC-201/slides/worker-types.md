### Multiple Worker Types

All tasks have a
$$
\left.\begin{align}
&\text{provisionerId}\\\\
&\text{workerType}
\end{align}\right\\}\text{Identifies a pool of workers}
$$

<div class="fragment">
<hr>
Multiple **worker implementations**:

<ul>
  <li><code>docker-worker</code> (node)</li>
  <li><code>generic-worker</code> (go)</li>
  <li><code>buildbot-bridge</code> (python)</li>
</ul>

</div>

<div class="fragment">
<hr>
More benefits:<br>
<ul>
  <li>Gradual migration of tasks</li>
  <li>Isolation for security</li>
  <li>Separate build/test tasks</li>
</ul>
</div>

