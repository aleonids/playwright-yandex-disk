pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker pull aleonids/docker-pw-local'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm --ipc=host aleonids/docker-pw-local /bin/bash'
                sh 'docker cp /home/leonid/.jenkins/workspace/docker-pw/. 635fa1880943:/autotest-yandex'
                sh 'docker exec -w /autotest-yandex 635fa1880943 npm run test'
                sh 'docker exec -w /autotest-yandex 635fa1880943 npx allure generate allure-results -o allure-report --clean'
            }
        }
    }
}docker exec playwright-$BUILD_NUMBER bash scripts/run_tests.sh
docker exec -w /autotest-yandex 1257352db3edd9bec87b0f861cf3db423a3cb164db650c5843e9c5c5b0ed32b2 bash scripts/run_tests.sh