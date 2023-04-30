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
                sh 'docker run --rm --ipc=host --name pw-container aleonids/docker-pw-local /bin/bash'
                sh 'docker ps -a'
                sh 'docker cp /home/leonid/.jenkins/workspace/playwright-docker/. pw-container:/autotest-yandex'
                sh 'docker exec -w /autotest-yandex pw-container npm run test'
                sh 'docker exec -w /autotest-yandex pw-container npx allure generate allure-results -o allure-report --clean'
                sh 'docker exec -w /autotest-yandex pw-container npx allure open allure-report  -p 8081'
            }
        }
    }
}