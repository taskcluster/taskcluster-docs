#! /bin/bash

set -e

npm install --quiet
export PATH="$PWD/node_modules/.bin:$PATH"

if [ "$1" = "pull-request" ]; then
    gulp check
elif [ "$1" = "push" ]; then
    export PUBLISH_BUCKET=docs-taskcluster-net2
    export PUBLISH_REGION=us-east-1
    eval $(node util/get-sts-credentials.js $PUBLISH_BUCKET)
    gulp publish
fi
