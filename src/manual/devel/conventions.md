---
title: Conventions
order: 1
---

TaskCluster is a very open platform!
To help us with our day to day work, we have created some standard approaches and conventions.
These make administration and coordination between the humans using the platform easier.

---

## Scopes and Roles

### When To Require A Role

When verifying the scopes for an API call or some other operation, the default behavior should be to check for appropriately-parameterized scopes.
These answer the question, "Can the caller do X".

However, when the operation modifies an object which will later perform actions using a role, then it is appropriate to require that the caller possess that role.
For example, hooks trigger tasks using role `hook-id:<hookGroupId>/<hookId>`, so the API calls to create and modify the hook require `assume:hook-id:<hookGroupId>/<hookId>` directly.
It is not enough simply to possess the role's extended scopes -- the caller must possess the assumed role itself.

### Encoding Information In Roles

Scopes should only ever be used to evaluate scope satisfaction; never pattern match scopes to try to extract information from them.

A common example of this error is in trying to determine a user's identity based on their credentials.
Since the `taskcluster-login` service helpfully adds scopes like `assume:mozilla-user:jrainer@ranierfamily.net`, it is tempting to look for a scope matching that pattern and extract the email address.

This has a few awkward failure modes, though.
Administrative users may have multiple matching scopes, or even `assume:mozilla-user:*`.
Even if those administrative users should avoid using your service with such powerful credentials, it's easy to do accidentally and incautious code may assume the user is named `*`.
Other credentials may have no matching scope, but still posess the scopes to authorize the bearer to perform an operation.
Basically, scopes are not a great way to communicate this information.

The appropriate way to determine a user's identity (as described in [Third Party Integration](/manual/integrations/apis/3rdparty)) is to find an email from some less trustworthy source such as the clientId, and then *verify* that email against the scopes, by asking "is `assume:mozilla-user:<email>` satisfied?"

---

## Services

### Managing Dependencies

Dependencies for deployed services are handled with [`npm shrinkwrap`](https://docs.npmjs.com/cli/shrinkwrap).
This is to ensure that we are deploying a consistent tree of package versions, and that dependency upgrades are controlled and not automatic or surprising.

When creating a new service, run `npm shrinkwrap` to generate an `npm-shrinkwrap.json` based on the packages you have installed in your development environment, then check that file into the Git repository.
When beginning development on an existing service, the usual `npm install` will install the specific versions named in the `npm-shrinkwrap.json`.

*Important*: Do not use `devDependencies`, as npm versions before 3.0 do not deal with them correctly and will cause failures in deployment that do not appear in local runs or Travis.
Instead, list all dependencies in `dependencies`.

When changing a service's dependencies, the easiest approach is to use `npm install --save` to install the package and update `package.json` at the same time.
Once this is complete, run `npm shrinkwrap` and add the modified `npm-shrinkwrap.json` to your commit.
Pull requests with a modified `package.json` that do not have a corresponding `npm-shrinkwrap.json` diff should be viewed with suspicion!

If is the service owner's responsibility to keep dependencies up to date.
The `npm outdated` command gives a useful overview of available updates.
In general, try to keep packages up to date within semver constraints (so, fix things displayed in red in `npm outdated`), but be cautious that the new code you are incorporating into your service is trustworthy.
In an ideal world, that means a thorough security review.
In the real world, that probably means a lot less.
