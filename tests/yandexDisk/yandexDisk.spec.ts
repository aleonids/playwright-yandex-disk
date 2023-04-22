import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { test } from "@playwright/test";
import * as Helpers from "../../src/pageObject/yandexDisk/helpers";
import * as HelpersApi from "../../src/pageObject/yandexDisk/api/helpers";

test.describe("Test Yandex disk", () => {
  test.beforeEach(async ({ page }) => {
    chromium.use(StealthPlugin());
    await page.goto("/");
  });

  test("Create a folder @critical", async ({ request, page }) => {
    const folderName = Helpers.getRandomName();

    await Helpers.createFolder(page, folderName);
    await HelpersApi.deleteByApiRequest(request, folderName);
  });

  test("Upload and check a file", async ({ page, request }) => {
    const folderName = Helpers.getRandomName();
    const fileName = Helpers.getRandomName();

    await Helpers.createFile(fileName);
    await HelpersApi.createFolderByApiRequest(request, folderName);
    await Helpers.uploadFile(page, folderName, fileName);
    await Helpers.testFile(page, fileName);
    await HelpersApi.deleteByApiRequest(request, folderName);
  });
});
