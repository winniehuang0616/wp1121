import { expect, test } from "@playwright/test";

import { signUpDummyUser } from "./utils";

test("7. Display user's name here", async ({ page }) => {
  await signUpDummyUser(page, "user1");
  const navBarUsernameSpan = page.locator("div").filter({ hasText: /^user1$/ });
  await expect(navBarUsernameSpan).toBeVisible();
});
