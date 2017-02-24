---
title: Building Microservices
order: 30
---

TaskCluster's libraries show a great deal more variety than the microservices.
Some aim to be useful outside of TaskCluster, while others are designed specifically for use in our own services.
As such, they share less in common.
However, we can identify a few best practices.

## Use `files`

Use the `files` property in `package.json` to whitelist the files that should be included in the library distribution.
This avoids packaging unnecessary files into the distribution, and more importantly avoids accidentally picking up files containing credentials!

This is often as simple as

```js
{
  "files": [
    "lib"
  ]
}
```

You can check what files are being included with `tar -ztf $(npm pack)`.

## Part Of The @taskcluster NPM Org

Ensure that your npm library is part of the @taskcluster team.

## Publish On Tag

Set up libraries to publish on a tag using [Travis-CI](https://docs.travis-ci.com/user/deployment/npm/).
The appropriate API token is for the 'taskcluster-bot' user, and the the token itself is available in the password store.
Use email `taskcluster-accounts@mozilla.com`.

To publish, run `npm version patch` (or `minor` or `major` depending on the semver changes).
This will update the version, create a new git commit, and create a tag.
So you only need to push to upstream with and without `--tags`:

```
git push upsream
git push upsream --tags
```

When the Travis job for that push completes, the new version should be deployed.
Note that the npmjs.com browser UI is cached and may not immediately represent the updated version.
