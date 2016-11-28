---
title: Reference Formats
order: 1
docson: true
---

Most TaskCluster components makes heavy use of JSON schemas for validation of
incoming and outgoing data, whether through APIs or AMQP exchanges. This makes
the external API surface very reliable and consistent, as well as it helps us
find a lot of bugs and typos.

The use of JSON schemas also makes it very easy to **generate documentation**
for all the external interfaces offered by TaskCluster components, as done on
this site. To further simplify the generation of documentation and API-clients
we have formalized formats for describing interfaces.

This document describes the formats in which references for API end-points and
AMQP exchanges are documented. This is useful for **automatic generation** of:

 * Documentation
 * Client libraries
 * Dummy mock servers

**Note**, these formats are not completely stable and change over time, or
merge into one.

---

## API References

Our API end-points all have a simple URL made up of a `baseUrl + route` where
a few argument have substituted into the `route`. The API end-point takes
JSON and input and returns JSON, input is always validate before it's accepted
and output is validated before it is returned.

This makes it easy to describe the API end-points in JSON with references to
JSON schema files. The reference format looks as follows:

<div data-render-schema="http://schemas.taskcluster.net/base/v1/api-reference.json">
</div>

The JSON schema for the API reference format is
`http://schemas.taskcluster.net/base/v1/api-reference.json` and references are
validated prior to publication.


## AMQP Exchange References

All of our AMQP exchanges are `topic` exchanges, and the messages are always in
JSON. Which makes it easy to validate all messages against a declared JSON
schema prior to publication. Note, we do **not** recommend validation of
messages upon consumption, as publishers may upgrade the schema in a
backwards compatible way in the future.

Usually, we prefix all exchanges from the same component with a common
`exchangePrefix` to ensure uniqueness. For routing keys we strive to always
have the same entries for messages on a given exchange and use `_` if no
value makes sense for the given routing key entry with a specific message.

These conventions makes it easy to describe all exchanges in JSON with
references to JSON schema files. The reference format looks as follows:

<div data-render-schema="http://schemas.taskcluster.net/base/v1/exchanges-reference.json">
</div>

The JSON schema for the exchanges reference format is
`http://schemas.taskcluster.net/base/v1/exchanges-reference.json` and references
are validated prior to publication.
