import { Page, expect, test } from "@playwright/test";
import imgGen from "js-image-generator";
import * as fs from "fs";
import * as fse from "fs-extra";

import {
  BACKGROUND_COLOR,
  CLOSE_BUTTON,
  COLUMN_BUTTONS,
  CREATE_BUTTON,
  CREATE_POPUP,
  CREATE_RESOURCE,
  Create,
  FILE,
  FOLDER,
  INPUT_FOLDER_NAME,
  LISTING,
  NEW_FOLDER_POPUP,
  RESPONSE_ENDPOINT,
  SAVE_BUTTON,
  TEST_FILE_EXTENSION,
  TEST_FOLDER,
  UPLOAD,
  UPLOADER,
  WRAPPER,
} from "./constants";

export function getRandomName(): string {
  return (Math.random() + 1).toString(32).substring(2);
}

export async function createFolder(page: Page, folderName: string) {
  await test.step("Waiting for the page to load", async () => {
    await page.waitForSelector(WRAPPER);
  });
  const createButton = page.locator(COLUMN_BUTTONS).locator(CREATE_BUTTON);

  await test.step("Click on 'Create' button", async () => {
    await expect(createButton).toBeEnabled();
    await createButton.click();
  });
  const createPopup = page.locator(CREATE_POPUP);
  const newFolderPopup = page.locator(NEW_FOLDER_POPUP);

  await test.step("Check that creating folder popup is displayed", async () => {
    await expect(createPopup).toBeVisible();
    await createPopup.locator(CREATE_RESOURCE).nth(Create.Folder).click();
    await expect(newFolderPopup).toBeVisible();
  });
  await test.step("Fill a folder name", async () => {
    await newFolderPopup.locator(INPUT_FOLDER_NAME).fill(folderName);
    await newFolderPopup.locator(SAVE_BUTTON).click();
    await expect(newFolderPopup).not.toBeVisible();
  });

  await test.step("Check that a new folder is displayed", async () => {
    await expect(
      page.locator(FOLDER, {
        has: page.locator(`text="${folderName}"`),
      })
    ).toBeVisible();
  });
}

// Create a test file
export async function createFile(fileName: string) {
  // Сlear the directory or create it if it is missing
  await fse.emptyDir(TEST_FOLDER);

  // Generate a test file
  imgGen.generateImage(100, 100, 70, function (err, image) {
    fs.writeFileSync(
      `${TEST_FOLDER}/${fileName}.${TEST_FILE_EXTENSION}`,
      image.data
    );
  });
}

// Upload a file
export async function uploadFile(
  page: Page,
  folderName: string,
  fileName: string
) {
  const folder = page.locator(FOLDER, {
    has: page.locator(`text="${folderName}"`),
  });

  await test.step("Open a folder", async () => {
    await expect(folder).toBeVisible();
    await folder.dblclick();
  });
  await test.step("Upload a file", async () => {
    await page.setInputFiles(
      UPLOAD,
      `${TEST_FOLDER}/${fileName}.${TEST_FILE_EXTENSION}`
    );
  });
  await test.step("Check the response after uploading the file", async () => {
    await page.waitForResponse(
      (response) =>
        response.url().includes(RESPONSE_ENDPOINT) && response.status() === 200
    );
  });

  // Assert of the changed background color after upload
  await test.step("Assert of the changed background color after upload", async () => {
    const backgroundColor = await page
      .locator(UPLOADER)
      .evaluate((element) => getComputedStyle(element).backgroundColor);

    expect(backgroundColor).toBe(BACKGROUND_COLOR);
  });
}

// Check a file
export async function testFile(page: Page, fileName: string) {
  const fullFileName = `${fileName}.${TEST_FILE_EXTENSION}`;
  const file = page.locator(LISTING).locator(FILE, {
    hasText: fileName,
  });

  await test.step("Check that the file has opened", async () => {
    await expect(file).toBeVisible();
    await page.waitForTimeout(2000);
    await file.dblclick();
  });
  const closeButton = page.locator(CLOSE_BUTTON);
  await test.step("Check that the file has closed", async () => {
    await expect(closeButton).toBeEnabled();
    await page.locator(CLOSE_BUTTON).click();
    await expect(
      page.locator(LISTING).locator(FILE, {
        hasText: fileName,
      })
    ).toBeVisible();
  });
}
