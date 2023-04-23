
pipeline {
  agent { node { label 'build_playwright' } }
  }
  stages {
    stage('install playwright') {
      steps {
        sh '''
          docker run -d --name=playwright mcr.microsoft.com/playwright sleep infinity
          npm i -D @playwright/test
          npx playwright install
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