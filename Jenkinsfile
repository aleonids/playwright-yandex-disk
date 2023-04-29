
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
         docker run -it --rm --ipc=host mcr.microsoft.com/playwright:v1.33.0-jammy /bin/bash
         docker cp $PWD playwright:/autotest-yandex
         docker exec -w /autotest-yandex playwright npm install npm@6 -g
         docker exec -w /autotest-yandex playwright npm install
         docker exec -w /autotest-yandex playwright npx playwright install
         apt-get update && \
         apt-get install -y openjdk-8-jdk && \
         apt-get install -y ant && \
         apt-get install -y unzip screen && \
         apt-get clean
         apt-get update && \
         apt-get install ca-certificates-java && \
         apt-get clean && \
         update-ca-certificates -f

        
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