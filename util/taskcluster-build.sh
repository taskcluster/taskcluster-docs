#! /bin/bash

set -e

npm install --quiet
export PATH="$PWD/node_modules/.bin:$PATH"

gulp download

if [ "$1" = "pull-request" ]; then
    gulp check
elif [ "$1" = "push" ]; then
    export PUBLISH_BUCKET=docs-taskcluster-net
    export PUBLISH_REGION=us-west-2
    gulp publish
fi
