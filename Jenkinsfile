pipeline {
    agent {
        docker {
            image 'aleonids/docker-pw-local'
        }
    }
    stages {
        stage('Run tests') {
            steps {
                sh 'npm run test'
            }
        }
    }
}