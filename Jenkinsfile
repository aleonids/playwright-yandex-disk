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
                sh 'docker cp /home/leonid/.jenkins/workspace/playwright-docker/. 635fa1880943:/autotest-yandex'
                sh 'docker exec -w /autotest-yandex 635fa1880943 npm run test'
                sh 'docker exec -w /autotest-yandex 635fa1880943 npx allure generate allure-results -o allure-report --clean'
                sh 'docker exec -w /autotest-yandex 635fa1880943 npx allure open allure-report  -p 8081'
            }
        }
    }
}