 ssh -i '/playwright.pem'  ec2-user@ec2-13-48-23-182.eu-north-1.compute.amazonaws.com
Описание
Данный проект содержит пример использования Playwright для автоматизации тестирования Yandex.Disk.

Установка
Для запуска проекта необходимо выполнить следующие шаги:

Установить Node.js (версия 14 и выше);

Склонировать репозиторий с помощью команды:

git clone https://github.com/your-username/your-project.git

Перейти в папку с проектом и установить зависимости (команды для Linux):
Запустив команды c помощью скрипта
chmod +x scripts/install.sh
sh scripts/install.sh

Или вручную:
npm init playwright@latest
npm i -D dotenv
npm install fs-extra
npm i --save-dev @types/fs-extra
npm install js-image-generator
npm install playwright-extra
npm install playwright-extra-plugin-stealth
npm i -D allure-playwright
npm i -D allure-commandline

Запуск тестов
Для запуска тестов необходимо выполнить команду:

npm run test - запуск всех тестов
npm run test-debug - запуск всех тестов в режиме отладки
npm run test-critical - запуск самых важных тестов с тегом @critical

Структура проекта
`
├── package.json
├── package-lock.json
├── README.md
├── src/
│   ├── pageObject/
│   │   └── yandexDisk/
│   │       ├── api/
│   │       │   ├── helpers.ts
│   │       └── helpers.ts
│   ├── tests/
│   │   └── yandexDisk/
│   │       └── yandexDisk.spec.ts
│   ├── helpers.ts
│   └── core/
│       ├── constants.ts
│       ├── global-setup.ts
│       ├── login.ts
│       └── types.ts
├── scripts/
│   ├── clear-report.sh
│   ├── install.sh
│   └── run_tests.sh
└── .env
`
src/pageObject/yandexDisk/api/helpers.ts - вспомогательные функции для работы с API Yandex.Disk;
src/pageObject/yandexDisk/helpers.ts - вспомогательные функции для работы с веб-страницей Yandex.Disk;
src/pageObject/yandexDisk/index.ts - объекты страниц и элементы страницы для Yandex.Disk;
src/pageObject/index.ts - общий объект страниц;
src/tests/yandexDisk/index.ts - точка входа для тестов Yandex.Disk;
src/tests/yandexDisk/createFolder.spec.ts - тест для проверки создания папки на Yandex.Disk;
src/tests/yandexDisk/uploadFile.spec.ts - тест для проверки загрузки файла на Yandex.Disk;
.env
core - для авторизации перед запуском
