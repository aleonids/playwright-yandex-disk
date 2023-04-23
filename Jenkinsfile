
pipeline {
  agent { 
    docker { 
      image 'mcr.microsoft.com/playwright:v1.32.3-focal'
    } 
  }
  environment {
    NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
}
  stages {
    stage('install playwright') {
      steps {
        sh '''
          npm i -D @playwright/test
          npx playwright install
          npm i -D dotenv
          npm install fs-extra
          npm i --save-dev @types/fs-extra
          npm install js-image-generator
          npm install playwright-extra
        '''
      }
    }
    stage('test') {
      steps {
        sh '''
          npx playwright test --list
          npx playwright test
        '''
      }
      post {
        success {
          archiveArtifacts(artifacts: 'homepage-*.png', followSymlinks: false)
          sh 'rm -rf *.png'
        }
      }
    }
  }
}