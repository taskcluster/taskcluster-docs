### Task file overview

* Tasks are stored in yaml format
* They support an "include" directive, called `$inherits`
* There are some predefined variables replacement surrounded by `{{{}}}`

```
$inherits:
  from: 'tasks/builds/b2g_phone_base.yml'
  variables:
    build_name: 'flame-kk'
    build_type: 'opt'
task:
  created: '{{now}}'
  deadline: '{{#from_now}}24 hours{{/from_now}}'
```
