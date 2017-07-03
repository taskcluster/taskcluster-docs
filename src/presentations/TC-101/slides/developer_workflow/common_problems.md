### Common Problems - Tips and Tricks

* All Taskcluster tasks do not appear in Treeherder
  * Check Decision task
    * Talk with #taskcluster team if no decision task symbol appears
  * If Decision task fails, but commit didn't alter any job related problems, rebase
* Only certain tasks do not appear in Treeherder
  * Check parent task to ensure it was scheduled and completed successfully
  * Are they configured to report to treeherder production?
  * Inspect task graph
    * Inspect decision task, click Task tab, click Task group ID
* Scope error when scheduling job
  * If new task, talk with #taskcluster team to ensure branch has appropriate scopes
* Tasks keep getting resolved as exception
  * View exception reason in the Treeherder Job Details pane or "Reason Resolved"
  in the task inspector.
