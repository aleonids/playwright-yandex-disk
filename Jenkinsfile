pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker pull aleonids/docker-pw-local'
                 sh 'docker --version'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run -it --rm --ipc=host aleonids/docker-pw-local /bin/bash'
                sh 'docker cp $PWD playwright-docker:/autotest-yandex'
                sh 'npx playwright test'
            }
        }
    }
}

