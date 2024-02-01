import { expect, test } from "@playwright/test";

import { prefetch, setup } from "./utils";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

test.beforeAll("Setup", async () => {
  await prefetch();
});

test.beforeEach(async ({ page }) => {
  await setup(page);
});

test("1. Add your private environment variables here for your database (postgres)", async ({
  page,
}) => {
  await page.goto(`${baseURL}/`);
  await page.waitForURL(`/auth`);
  await expect(page).toHaveURL("/auth");
});
