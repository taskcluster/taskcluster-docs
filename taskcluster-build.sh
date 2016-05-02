#! /bin/bash

set -e -x

npm install --quiet
export PATH="$PWD/node_modules/.bin:$PATH"

if [ "$1" = "pull-request" ]; then
    gulp check
else
    # TODO: get S3 credentials
    export PUBLISH_BUCKET=docs.taskcluster.net
    gulp publish
fi
