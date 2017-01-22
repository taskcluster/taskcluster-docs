---
title: Building Microservices
order: 20
---

The TaskCluster microservices are all maintained independently, but we share responsibility for maintaining them.
This shared responsibility is easier for everyone if the implementations are similar, avoiding surprises when moving from one service to another.
This document aims to collect the practices and standards we've agreed on.

Most services do not live up to these standards -- TaskCluster is a work in progress -- but pull requests to bring services up-to-date with one or more points are always appreciated.
Many of these aren't hard-and-fast rules, either.
If there's good reason to do otherwise, do so!

## Package Mechanics

### Repository

Services should be in a Github repository in the `taskcluster` organization, with the repo name having the prefix `taskcluster-`.

### Source Layout

Include all source in the `src/` directory, and all tests in `test/`.
The babel-compile configuration will compile those to `lib/` and `.test/`, respectively.
Within the `src` directory, the main script should be named `main.js`.

### Node

Prefer to use the latest stable node version, and corresponding npm version.
Encode this version both in `package.json` and in any CI configurations such as `.taskcluster.yml`.

### Compiling

Use [babel-compile](https://github.com/taskcluster/babel-compile) to compile your application.
Its README describes how to set it up generally, but for a TaskCluster service, you will need to install `babel-compile` and `babel-preset-taskcluster`.
Include the following in your `package.json`:

```js
  "scripts": {
    "compile": "babel-compile -p taskcluster src:lib test:.test",
    "pretest": "npm run compile",
    "install": "npm run compile",
  }
```

### Dependencies

Try to keep up-to-date with the latest versions of all TaskCluster libraries.
In general, the implications of updating these libraries should be clear, and the authors are easy to find when things go badly.

Other dependencies should also be kept up-to-date as much as possible.
Tools like [Greenkeeper](https://greenkeeper.io/) can be very useful for this purpose.

### Shrinkwrap

Dependencies for deployed services are handled with [`npm shrinkwrap`](https://docs.npmjs.com/cli/shrinkwrap).
This is to ensure that we are deploying a consistent tree of package versions, and that dependency upgrades are controlled and not automatic or surprising.

When creating a new service, run `npm shrinkwrap` to generate an `npm-shrinkwrap.json` based on the packages you have installed in your development environment, then check that file into the Git repository.
When beginning development on an existing service, the usual `npm install` will install the specific versions named in the `npm-shrinkwrap.json`.

*Important*: npm versions before 3.0 do not deal with devDependencies correctly and will cause failures in deployment that do not appear in local runs or Travis.
Use a newer version of Node/npm.

When changing a service's dependencies, the easiest approach is to use `npm install --save` to install the package and update `package.json` at the same time.
Add the modified `package.json` and `npm-shrinkwrap.json` to your commit.
Pull requests with a modified `package.json` that do not have a corresponding `npm-shrinkwrap.json` diff should be viewed with suspicion!

It is the service owner's responsibility to keep dependencies up to date.
The `npm outdated` command gives a useful overview of available updates.
In general, try to keep packages up to date within semver constraints (so, fix things displayed in red in `npm outdated`), but be cautious that the new code you are incorporating into your service is trustworthy.
In an ideal world, that means a thorough security review.
In the real world, that probably means a lot less.

## Testing

### Test Setup

Use Mocha to run unit tests, in the `test/` directory.
Include the following in `mocha.opts`, most critically the `--ui tdd`.

```
--ui tdd
--timeout 30s
--reporter spec
```

Name the test files `test/*_test.js`, so they will be matched by the `npm test` script given above.
These files should require production code from `../lib/`: `foo = require('../lib/foo')`.

### Helpers

Include any shared test-specific code in `test/helpers.js`.

### ESLint

Use [eslint-config-taskcluster](https://github.com/taskcluster/eslint-config-taskcluster) and [eslint-plugin-taskcluster](https://github.com/taskcluster/eslint-plugin-taskcluster) along with `mocha-eslint` to check for lint.

To do so, install `eslint`, `babel-eslint`, `mocha-eslint`, `eslint-config-taskcluster`, and `eslint-plugin-taskcluster`.
Add the following to the `scripts` section of `package.json`: `"test": "mocha .test/lint.js .test/*_test.js"`.

Create `.eslintrc` in the root of the repository with
```js
{
  "extends": "eslint-config-taskcluster"
}
```

And the following in `test/lint.js`:
```js
var lint = require('mocha-eslint');

var paths = [
  'src/*.js',
  'test/*.js',
];

lint(paths);
```

### Test Requirements

A simple `git clone` .. `npm install` .. `npm test` should run successfully for new contributors.
Anything else dramatically increases the difficulty in getting started.

Where possible, try to write tests that do not require any credentials or access to external services.
Liberal use of fakes, mocks, stubs, etc. allows most application logic to be tested in isolation.
Note that `taskcluster-lib-loader` allows dependency injection by means of overwrites:

```js
let server = await load('server', {
  profile: 'test',
  dependency1: fakeDep1,
  dependency2: fakeDep2,
});
```

For tests that must have credentials, check for the presence of credentials and mark the suite as pending if they are not available:

```js
suite("things", function() {
  if (!helper.haveRealCredentials) {
    this.pending = true;
  }
});
```

This will generate clear output for anyone running the tests without credentials, showing that many tests were not run.
If they make a pull request, then the full suite will run in automation, and any issues not detected locally will be revealed.

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
  version:              1,
}).configure({
  version:              2,
  migrate: function(item) {
    // ...
  },
}).configure({
  version:              3,
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

The API definition should be in `src/v1.js`:

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
