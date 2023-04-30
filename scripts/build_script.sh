#!/bin/bash

git clean -fdx && git fetch -p

list=(YANDEX_DISK_TESTS \
) >/dev/null

for t in ${list[@]}; do
    if [ $(eval echo $$(echo $t)) == "all" ]; then
        export $(echo $t)='true'
        export $(echo $t)_CRITICAL='false'
    elif [[ $(eval echo $$(echo $t)) == "critical" ]]; then
        export $(echo $t)='false'
        export $(echo $t)_CRITICAL='true'
    else
        export $(echo $t)='false'
        export $(echo $t)_CRITICAL='false'
    fi
done 2>/dev/null

docker run -e YANDEX_DISK_TESTS=$YANDEX_DISK_TESTS \
    -e YANDEX_DISK_TESTS_CRITICAL=$YANDEX_DISK_TESTS_CRITICAL \
    --name=playwright-$BUILD_TAG -d aleonids/docker-pw-local:latest sleep infinity

docker pull aleonids/docker-pw-local
docker run --rm --ipc=host aleonids/docker-pw-local /bin/bash
docker cp /home/leonid/.jenkins/workspace/docker-pw/. playwright-$BUILD_TAG:/autotest-yandex
docker exec -w /autotest-yandex playwright-$BUILD_TAG bash scripts/run_tests.sh
docker cp playwright-$BUILD_TAG:/autotest-yandex/allure-results /home/leonid/.jenkins/workspace/docker-pw/
docker stop playwright-$BUILD_TAG && docker rm playwright-$BUILD_TAG
