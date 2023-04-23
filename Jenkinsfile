
pipeline {
  agent { 
    docker { 
      image 'mcr.microsoft.com/playwright'
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
          npm install playwright-extra-plugin-stealth
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