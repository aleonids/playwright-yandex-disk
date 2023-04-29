pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker pull aleonids/docker-pw-local'
                 sh 'docker ps'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm --ipc=host aleonids/docker-pw-local /bin/bash'
                sh 'docker cp /home/leonid/.jenkins/workspace/playwright-docker 424bb1c2dfc4:/autotest-yandex'
                sh 'npx playwright test'
            }
        }
    }
}

