#! /bin/bash

set -e

yarn install --no-progress

yarn download

if [ "$1" = "pull-request" ]; then
    yarn check
    # [C] here avoids matching itself
    if git grep Task[C]luster; then
        echo "Pull Request contains incorrect capitalization of Taskcluster; see above"
        exit 1
    fi
elif [ "$1" = "push" ]; then
    export PUBLISH_BUCKET=docs-taskcluster-net
    export PUBLISH_REGION=us-west-2
    export MOZILLIANS_SECRET=project/taskcluster/tc-docs/mozillians
    yarn deploy
fi
