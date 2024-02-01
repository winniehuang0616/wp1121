import { test, expect } from "@playwright/test";

import { prefetch, setup, signUpDummyUser } from "./utils";

test.beforeAll("Setup", async () => {
  await prefetch();
});

test.beforeEach(async ({ page }) => {
  await setup(page);
});

test("5. After creating a project, redirect to the project page", async ({
  page,
}) => {
  await signUpDummyUser(page, "user12");
  await page.getByRole("link", { name: "+ Create Project" }).click();
  await page.locator("input").click();
  await page.locator("input").fill("new title");
  await page.locator("textarea").click();
  await page.locator("textarea").fill("123123123");
  await page.getByRole("button", { name: "Create" }).click();

  const title = page.locator("h1");
  await expect(title).toHaveText("new title");

  const content = page.getByText("123123123");
  await expect(content).toHaveText("123123123");
});
