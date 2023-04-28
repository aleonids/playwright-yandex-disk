
pipeline {
  agent { 
    docker { 
      image 'mcr.microsoft.com/playwright:v1.33.0-jammy'
      args '--ipc=host --network=host'
    } 
  }
  environment {
    LAUNCH_DIAGNOSTICS = "true"
    NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
}
  stages {
    stage('install playwright') {
      steps {
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