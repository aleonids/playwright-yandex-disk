### Описание
Данный проект содержит пример использования Playwright для автоматизации тестирования Yandex.Disk.

### Установка
Для запуска проекта необходимо выполнить следующие шаги:

Установить Node.js (версия 14 и выше);

Склонировать репозиторий с помощью команды:

`git clone https://github.com/aleonids/playwright-yandex-disk.git`

Перейти в папку с проектом и установить зависимости (команды для Linux):
Запустив команды c помощью скрипта
`chmod +x scripts/install.sh`
`sh scripts/install.sh`

Или вручную:
`npm init playwright@latest`
`npm i -D dotenv`
`npm install fs-extra`
`npm i --save-dev @types/fs-extra`
`npm install js-image-generator`
`npm install playwright-extra`
`npm install playwright-extra-plugin-stealth`
`npm i -D allure-playwright`
`npm i -D allure-commandline`

### Запуск тестов
Для запуска тестов необходимо выполнить команду:

`npm run test - запуск всех тестов`
`npm run test-debug - запуск всех тестов в режиме отладки`
`npm run test-critical - запуск самых важных тестов с тегом @critical`

### Структура проекта

├── package.json <br/>
├── package-lock.json <br/>
├── README.md <br/>
├── src/ <br/>
│   ├── pageObject/ <br/>
│   │   └── yandexDisk/ <br/>
│   │       ├── api/ <br/>
│   │       │   ├── helpers.ts <br/>
│   │       └── helpers.ts <br/>
│   ├── tests/ <br/>
│   │   └── yandexDisk/ <br/>
│   │       └── yandexDisk.spec.ts <br/>
│   ├── helpers.ts <br/>
│   └── core/ <br/>
│       ├── constants.ts <br/>
│       ├── global-setup.ts <br/>
│       ├── login.ts <br/>
│       └── types.ts <br/>
├── scripts/ <br/>
│   ├── clear-report.sh <br/>
│   ├── install.sh <br/>
│   └── run_tests.sh <br/>
└── .env <br/>

`src/pageObject/yandexDisk/api/helpers.ts` - вспомогательные функции для работы с API Yandex.Disk;
`src/pageObject/yandexDisk/helpers.ts` - вспомогательные функции для работы с веб-страницей Yandex.Disk;
`src/pageObject/yandexDisk/index.ts` - объекты страниц и элементы страницы для Yandex.Disk;
`src/pageObject/index.ts` - общий объект страниц;
`src/tests/yandexDisk/yandexDisk.spec.ts` - тесты Yandex.Disk;
`.env` - доступы
`srs/core/global-setup.ts` - авторизация до запуска тестов. Данные передаются через storageState.json
`scripts/clear-report.sh` - скрипт для удаления папок с отчетами allure
`scripts/install.sh` - пеовоначальная установка playwright и всех зависимостей (перед запуском выполнить chmod +x scripts/install.sh)
`scripts/run-tests.sh` - скрипт для запуска тестов
