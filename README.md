### Описание

Данный проект содержит пример использования Playwright для автоматизации тестирования Yandex.Disk.

- Доступы хранятся в файле .env. <br/>
- Чтобы ускорить тесты и сделать их стабильнее, создание папки и создание файла реализовано отдельными тестами. <br/>

![run tests](lib/test-run.png)

- Авторизация проходит перед тестами. Данные передаются в тесты через `storageState.json`. Ускоряет прохождение, не нужно логиниться в каждом тесте. <br/>
- В первом тесте создается папка в UI. <br/>
- Во втором тесте создается папка по API (т.к. создание папки в UI проверяется в первом тесте) и в нее загружается файл (не во всех странах есть возможность создавать документы в яндекс диске, поэтому файл был загружен). Тесты независимые и запускаются одновременно. Если упадет создание папки, то проверка загрузки файла все равно запустится.
- Для возможности обхода капчи и скрытия режима headless использован `StealthPlugin` плагин. <br/>
- Отчет о прохождении тестов формируется в таком виде:
  [https://aleonids.github.io/playwright-yandex-disk/index.html](https://aleonids.github.io/playwright-yandex-disk/index.html) <br/>
- Для запуска тестов в Jenkins написан скрипт: [https://github.com/aleonids/playwright-yandex-disk/blob/master/scripts/run_tests.sh](https://github.com/aleonids/playwright-yandex-disk/blob/master/scripts/run_tests.sh). Можно запускать все тесты или, например, помеченные тегом @critical. <br/>
- Настроен запуск тестов из Jenkins в подготовленном docker-образе, загруженном на docker hub. <br/>
- В параметризованной сборке выбирается запустить все тесты или с тегом @critical: <br/>

![Jenkins screen](lib/jenkins-screen.jpg)

- Переменная c выбранными тестами передается из Jenkins в Docker-контейнер и скрипт run_tests.sh запускает нужные тесты. Скриншот с настройками Jenkins: <br/>

![Jenkins script](lib/Jenkins-script.jpg)

### Установка

Для запуска проекта необходимо выполнить следующие шаги: <br/>

Установить Node.js (версия 14 и выше); <br/>

Склонировать репозиторий с помощью команды: <br/>

`git clone https://github.com/aleonids/playwright-yandex-disk.git`

Перейти в папку с проектом и установить зависимости (команды для Linux) <br/>
Запустив команды c помощью скрипта: <br/>
`chmod +x scripts/install.sh` <br/>
`sh scripts/install.sh` <br/>

Или вручную: <br/>
`npm init playwright@latest` <br/>
`npm i -D dotenv` <br/>
`npm install fs-extra` <br/>
`npm i --save-dev @types/fs-extra` <br/>
`npm install js-image-generator` <br/>
`npm install playwright-extra` <br/>
`npm install playwright-extra-plugin-stealth` <br/>
`npm i -D allure-playwright` <br/>
`npm i -D allure-commandline` <br/>

### Запуск тестов

Для запуска тестов необходимо выполнить команду: <br/>

`npm run test` - запуск всех тестов <br/>
`npm run test-debug` - запуск всех тестов в режиме отладки <br/>
`npm run test-critical` - запуск самых важных тестов с тегом @critical <br/>

### Структура проекта

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

- `src/pageObject/yandexDisk/api/helpers.ts` - вспомогательные функции для работы с API Yandex.Disk; <br/>
- `src/pageObject/yandexDisk/helpers.ts` - вспомогательные функции для работы с веб-страницей Yandex.Disk; <br/>
- `src/pageObject/yandexDisk/index.ts` - объекты страниц и элементы страницы для Yandex.Disk; <br/>
- `src/pageObject/index.ts` - общий объект страниц; <br/>
- `src/tests/yandexDisk/yandexDisk.spec.ts` - тесты Yandex.Disk; <br/>
- `.env` - доступы <br/>
- `srs/core/global-setup.ts` - авторизация до запуска тестов. Данные передаются через `storageState.json` <br/>
- `scripts/clear-report.sh` - скрипт для удаления папок с отчетами allure <br/>
- `scripts/install.sh` - пеовоначальная установка playwright и всех зависимостей (перед запуском выполнить `chmod +x scripts/install.sh`) <br/>
- `scripts/run-tests.sh` - скрипт для запуска тестов <br/>
