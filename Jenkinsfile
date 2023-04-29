pipeline {
    agent {
        docker {
            image 'aleonids/docker-pw-local'
              args '--ipc=host --network=host'   
        }
    }
     environment {
    LAUNCH_DIAGNOSTICS = "true"
    NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
}                                                  
    stages {
        stage('Run tests') {
            steps {
              sh 'docker --version'
                sh 'npm run test'
            }
        }
    }
}