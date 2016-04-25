### Branch config

```
builds:
  linux64_gecko:
    platforms:
      - b2g
    types:
      opt:
        task: tasks/builds/b2g_desktop_opt.yml
      debug:
        task: tasks/builds/b2g_desktop_debug.yml
tests:
  gaia-linter:
    allowed_build_tasks:
      tasks/builds/b2g_desktop_opt.yml:
        task: tasks/tests/b2g_linter.yml
      tasks/builds/mulet_linux.yml:
        task: tasks/tests/mulet_linter.yml
```
