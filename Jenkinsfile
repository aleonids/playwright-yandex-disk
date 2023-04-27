
pipeline {
  agent { 
    docker { 
      image 'mcr.microsoft.com/playwright:v1.32.3-focal'
      args '--ipc=host --network=host -p 8081:8080'
    } 
  }
  environment {
   LAUNCH_DIAGNOSTICS="true"
   NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
}
  stages {
    stage('Build Docker image') {
      steps {
        script {
            docker.build("playwright-docker:latest", "-f Dockerfile .")
            
        }

        sh '''
         npm install husky --save-dev
         npm install
         npx playwright install
        
        '''
      }
    }
    stage('test') {
      steps {
        sh '''
          npx playwright test
        '''
      }
      }
  }
}