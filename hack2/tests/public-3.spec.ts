import { test, expect } from "@playwright/test";

import { prefetch, setup, signUpDummyUser } from "./utils";

test.beforeAll("Setup", async () => {
  await prefetch();
});

test.beforeEach(async ({ page }) => {
  await setup(page);
});

test("3. Sign in by calling signIn() with the correct parameters", async ({
  page,
}) => {
  await signUpDummyUser(page, "user1");
  await expect(page.getByTestId("title")).toHaveText("Your Projects");
});
