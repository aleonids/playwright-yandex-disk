### Description

This project contains an example of using Playwright to automate testing of Yandex.Disk.
- Accesses are stored in the .env file. <br/>
- To speed up tests and make them more stable, creating a folder and creating a file are implemented as separate tests. <br/>
![run tests](lib/test-run.png)

- Authorization occurs before the tests. Data is passed to the tests via storageState.json. This speeds up the process; there's no need to log in for each test. <br/>
- The first test creates a folder in the UI. <br/>
- The second test creates a folder via API (since folder creation in UI is verified in the first test) and uploads a file into it (not all countries have the capability to create documents on Yandex Disk, so a file was uploaded). The tests are independent and run simultaneously. If the folder creation fails, the file upload check will still execute. <br/>
- To bypass CAPTCHA and hide the headless mode, the StealthPlugin plugin is used. <br/>
- The test pass report is formatted as follows:
https://aleonids.github.io/playwright-yandex-disk/index.html <br/>
- For running tests in Jenkins, a script is written: https://github.com/aleonids/playwright-yandex-disk/blob/master/scripts/run_tests.sh. All tests can be run or, for example, those marked with the @critical tag. <br/>
- Configured test execution from Jenkins in a prepared Docker image uploaded to Docker Hub. <br/>
- In the parameterized build, you can choose to run all tests or those tagged @critical: <br/>
![Jenkins screen](lib/jenkins-screen.jpg)

The variable with selected tests is passed from Jenkins to the Docker container, and the run_tests.sh script runs the necessary tests. Jenkins settings screenshot: <br/>
![Jenkins script](lib/Jenkins-script.jpg)

### Installation

To run the project, you need to perform the following steps:

Install Node.js (version 14 and higher);

Clone the repository using the command:

`git clone https://github.com/aleonids/playwright-yandex-disk.git`

Go to the project folder and install dependencies (commands for Linux) <br/>
Running commands using the script: <br/>
`chmod +x scripts/install.sh` <br/>
`sh scripts/install.sh` <br/>

Or manually: <br/>
`npm init playwright@latest` <br/>
`npm i -D dotenv` <br/>
`npm install fs-extra` <br/>
`npm i --save-dev @types/fs-extra` <br/>
`npm install js-image-generator` <br/>
`npm install playwright-extra` <br/>
`npm install playwright-extra-plugin-stealth` <br/>
`npm i -D allure-playwright` <br/>
`npm i -D allure-commandline` <br/>

### Running Tests

To run the tests, execute the command: <br/>

`npm run test` - uns all tests. <br/>
`npm run test-debug` - runs all tests in debug mode. <br/>
`npm run test-critical` - runs the most important tests with the tag @critical. <br/>

### Project Structure

├── package.json <br/>
├── package-lock.json <br/>
├── README.md <br/>
├── src/ <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── pageObject/ <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── yandexDisk/ <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── api/ <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── helpers.ts <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── helpers.ts <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── tests/ <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── yandexDisk/ <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── yandexDisk.spec.ts <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── helpers.ts <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── core/ <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── constants.ts <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── global-setup.ts <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── login.ts <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── types.ts <br/>
├── scripts/ <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── clear-report.sh <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── install.sh <br/>
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── run_tests.sh <br/>
└── .env <br/>

- `src/pageObject/yandexDisk/api/helpers.ts` - auxiliary functions for working with the Yandex.Disk API. <br/>
- `src/pageObject/yandexDisk/helpers.ts` - auxiliary functions for working with the Yandex.Disk web page. <br/>
- `src/pageObject/yandexDisk/index.ts` - page objects and page elements for Yandex.Disk. <br/>
- `src/pageObject/index.ts` - common page object. <br/>
- `src/tests/yandexDisk/yandexDisk.spec.ts` - Yandex.Disk tests. <br/>
- `.env` - credentials. <br/>
- `srs/core/global-setup.ts` - authorization before running tests. Data is passed through `storageState.json` <br/>
- `scripts/clear-report.sh` - script to remove Allure report folders. <br/>
- `scripts/install.sh` - initial installation script for Playwright and all its dependencies (run `chmod +x scripts/install.sh` before executing). <br/>
- `scripts/run-tests.sh` - a script for running tests <br/>
