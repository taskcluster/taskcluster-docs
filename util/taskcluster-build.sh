#! /bin/bash

set -e

npm install --quiet
export PATH="$PWD/node_modules/.bin:$PATH"

if [ "$1" = "pull-request" ]; then
    gulp check
elif [ "$1" = "push" ]; then
    export PUBLISH_BUCKET=docs-taskcluster-net
    export PUBLISH_REGION=us-west-2
    eval $(node lib/sts.js read-write $PUBLISH_BUCKET)
    gulp publish
fi
