import { test } from "@playwright/test";

import {
  prefetch,
  setup,
  signUpDummyUser,
  validateHashedPassword,
} from "./utils";

test.beforeAll("Setup", async () => {
  await prefetch();
});

test.beforeEach(async ({ page }) => {
  await setup(page);
});

test("2. Hash password with bcrypt", async ({ page }) => {
  await signUpDummyUser(page, "user1");
  await validateHashedPassword();
});
