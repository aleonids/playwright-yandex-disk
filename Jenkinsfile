pipeline {
    agent {
        docker {
            image 'leonids/docker-pw-local'
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