import { Page } from "@playwright/test";

export type TypeLogin = {
  page: Page;
  username: string;
  password: string;
};
