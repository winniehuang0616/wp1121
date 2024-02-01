import { test } from "@playwright/test";

import { prefetch, setup, signUpDummyUser, signOut } from "./utils";

test.beforeAll("Setup", async () => {
  await prefetch();
});

test.beforeEach(async ({ page }) => {
  await setup(page);
});

test("4. Call the signOut() function when the button is clicked", async ({
  page,
}) => {
  await signUpDummyUser(page, "user1");
  await signOut(page);
});
