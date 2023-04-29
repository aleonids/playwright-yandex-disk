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
                sh 'docker cp /home/leonid/.jenkins/workspace/playwright-docker c344ade3c254:/autotest-yandex'
                sh 'docker exec -t c344ade3c254 ls /autotest-yandex'
                sh 'docker exec -w c344ade3c254:/autotest-yandex npx playwright test'
            }
        }
    }
}

