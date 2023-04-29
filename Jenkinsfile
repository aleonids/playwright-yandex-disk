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
                sh 'docker cp /home/leonid/.jenkins/workspace/playwright-docker/* 93142b14e6b3:/autotest-yandex'
                sh 'docker exec -w /autotest-yandex 93142b14e6b3 npx playwright test'
            }
        }
    }
}

