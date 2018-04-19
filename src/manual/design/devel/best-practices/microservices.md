---
filename: design/devel/best-practices/microservices.md
title: Building Microservices
order: 20
---

The Taskcluster microservices are all maintained independently, but we share responsibility for maintaining them.
This shared responsibility is easier for everyone if the implementations are similar, avoiding surprises when moving from one service to another.
This document aims to collect the practices and standards we've agreed on.

These conventions are strongly encouraged for new services and contributions updating existing services to follow them are always welcome.
When we have a good reason to not follow the convention for a specific service, we document why.

## Naming

The name of the service should begin with "taskcluster", followed by something brief and accurate.
Use this name as the identifier for the project everywhere -- repository, deployment, logging, monitoring, docs, etc.
This makes it easy to predict the URL for the project when we're in a hurry.

It's OK to refer to a service more casually in prose, e.g., "the hooks service" instead of "taskcluster-hooks".

## Package Mechanics

### Repository

Services should be in a Github repository in the `taskcluster` organization, with the repo name having the prefix `taskcluster-`.

### Source Layout

Include all source in the `src/` directory, and all tests in `test/`.
See [testing](testing) for more information on testing.

Within the `src` directory, the main script should be named `main.js`.
This file should use `taskcluster-lib-loader` as described below, and should serve as the main entry point to the service.
This file should be set as the `main` property in `package.json`.

### Node

Prefer to use the latest stable node version, and corresponding yarn version. These should both be locked and not specified
as a range. This means in particular no `^` in front of either version spec.
Encode this version both in `package.json` and in any CI configurations such as `.taskcluster.yml`.

`package.json` should have the `"engine-strict": true` flag set. Preferably directly above the `engines` stanza.

We now try to have all of our services using node 8 or later. This allows us to run directly with the ECMAScript 2017 features
without needing any compilation. For the time being, our libraries will still be compiled to support old services or other users.

## Managing Dependencies

Try to keep up-to-date with the latest versions of all Taskcluster libraries.
In general, the implications of updating these libraries should be clear, and the authors are easy to find when things go badly.

Other dependencies should also be kept up-to-date as much as possible.

### Yarn

We have moved from [npm](https://docs.npmjs.com/cli/npm) to [yarn](https://yarnpkg.com/) for as much as possible. This means that
you should not `npm install` anything and there is no `npm-shrinkwrap.json`. Generally you'll want `yarn install` and `yarn add` in
place of `npm install` and `npm install <package>`. Yarn should keep everything in a `yarn.lock` file that is committed to version
control.

When changing a service's dependencies, use the `yarn` comands.
This will update both `package.json` and `yarn.lock` automatically.

 * `yarn add some-lib`
 * `yarn remove some-lib`
 * `yarn add some-lib@^2.3.0`  (to update an existing dependency's version)

It is the service owner's responsibility to keep dependencies up to date.
The `yarn outdated` command gives a useful overview of available updates.
In general, try to keep packages up to date within semver constraints (so, fix things displayed in red in `yarn outdated`), but be cautious that the new code you are incorporating into your service is trustworthy.
In an ideal world, that means a thorough security review.
In the real world, that probably means a lot less.

## Deployment

### Git Version

The build process should place a file named `.git-version` in the root of the
application directory containing the full Git revision from which the
application was built. This information can then be used for error reporting,
etc.

To accmplish this, the `scripts` section of `package.json` should contain
`"heroku-prebuild": "echo $SOURCE_VERSION > .git-version"`.

### Verification Steps

Somewhere in the README, describe how to deploy the service, if it's anything more complicated than a Heroku app or pipeline.

In any case, include a short description of how to verify that the service is up and running after a deployment.
This may be as simple as loading the relevant tools page and seeing content from the service.

### Logging

Connect the service to the Taskcluster papertrail account.
For Heroku services, follow [the standalone method](http://help.papertrailapp.com/kb/hosting-services/heroku/).
Name the service in papertrail to match the repository name.

## Taskcluster Libraries

### General

Do not use `taskcluster-base`.
Instead, depend directly on the `taskcluster-lib-*` libraries the service requires.

The following sections describe best practices for specific platform libraries.

### taskcluster-lib-loader

The main entry-point for the service should be `src/main.js`, which should use [taskcluster-lib-loader](https://github.com/taskcluster/taskcluster-lib-loader) and have the following initialization code:

```js
// If this file is executed launch component from first argument
if (!module.parent) {
  load(process.argv[2], {
    process: process.argv[2],
    profile: process.env.NODE_ENV,
  }).catch(err => {
    console.log(err.stack);
    process.exit(1);
  });
}

// Export load for tests
module.exports = load;
```

Entries in `Procfile`, then, look like `web: node lib/main.js server`.
The web service should always be the component named `server`.
All services, including those run from the Heroku scheduler, should start like this, via `lib/main.js`.

### azure-entities

Each Azure table should be defined in `src/data.js` using a cascade of `configure` calls, one for each version:

```js
var MyEntity = Entity.configure({
  version: 1,
}).configure({
  version: 2,
  migrate: function(item) {
    // ...
  },
}).configure({
  version: 3,
  migrate: function(item) {
    // ...
  },
});
```

The result is a `MyEntity` class that can be setup with additional configuration in a loader component, in `src/main.js`:

```js
{
  MyEntity: {
    requires: ['cfg', 'process', 'monitor'],
    setup: ({cfg, process, monitor}) => {
      return data.MyEntity.setup(_.defaults({
        table:        cfg.app.hookTable,
        monitor:      monitor.prefix(cfg.app.hookTable.toLowerCase()),
        component:    cfg.app.component,
        process,
      }, cfg.azureTable, cfg.taskcluster));
    },
  },
}
```

In `src/data.js`, it is common to add utility methods for the entity type.
For entities which can be fetched via an API, a `json` method is common:

```js
MyEntity.prototype.json = () => {
  return {
    foo: this.foo,
  };
};
```

### taskcluster-lib-api

The API definition should be in `src/v1.js` or `src/api.js`:

```js
var api = new API({
  // ...
});

// Export api
module.exports = api;

/** Get hook groups **/
api.declare({
  // ...
});
// ...
```

This is then imported and set up in `src/main.js`:

```js
{
  router: {
    requires: ['cfg', 'profile', 'validator', 'monitor'],
    setup: ({cfg, profile, validator, monitor}) => {
      return v1.setup({
        context: {},
        authBaseUrl:      cfg.taskcluster.authBaseUrl,
        publish:          profile === 'production',
        baseUrl:          cfg.server.publicUrl + '/v1',
        referencePrefix:  'myservice/v1/api.json',
        aws:              cfg.aws,
        validator,
        monitor,
      });
    },
  },
}
```

#### Error Handling

Do not use `res.status(..)` to return error messages.
Instead, use `res.reportError(code, message, details)`.
The `taskcluster-lib-api` library provides most of the codes you will need, specifically `InvalidInput`, `ResourceNotFound`, and `ResourceConflict`.

Prefer to use these built-in codes.
If you have a case where you must return a different HTTP code, or clients need to be able to distinguish the errors programmatically, add a new error code:

```js
var api = new API({
  description: [
    // ...
    '',
    '## Error Codes',
    '',
    '* `SomethingReallyBad` (472) - you\'re really not going to like this',
  ].join('\n'),
  errorCodes: {
    SomethingReallyBad: 472,
  },
});
// ...
res.reportError('SomethingReallyBad',
  'Something awful happened: {{awfulthing}}',
  {awfulThing: result.awfulness});
```

Be friendly and document the errors in the API's `description` property, as they are not automatically documented.

### taskcluster-lib-monitor

*Do not use* `taskcluster-lib-stats` or `raven`.
Instead, use `taskcluster-lib-monitor` as described in its documentation.

### taskcluster-lib-docs

All services should use `taskcluster-lib-docs` as directed to upload documentation.

The service will include substantial documentation in Markdown format in its `docs/` directory.
The docs library will automatically include the service's `README.md`, as well, and that is a good place to include an overview and development/deployment instructions.

If the service provides an API or pulse exchanges, set it up to publish that information as directed.
