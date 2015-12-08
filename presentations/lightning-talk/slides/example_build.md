### Example on-push build

```bash
/b2g-inbound$ touch testing/docker/builder/test
/b2g-inbound$ hg commit --addremove -m \
    "Testing - add file try: -b do -p linux64_gecko -u none"
/b2g-inbound$ hg push -f -r . try
….added 1 changesets...
```
<center>
<img class="fragment" src="images/decision_task.png"><br>
<img class="fragment" src="images/image_task.png"><br>
<img class="fragment" src="images/dependent_tasks.png"><br>
</center>
