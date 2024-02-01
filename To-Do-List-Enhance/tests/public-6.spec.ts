import { expect, test } from "@playwright/test";

import { signUpDummyUser } from "./utils";

test("6. Update the navbar for the user's projects ", async ({ page }) => {
  await signUpDummyUser(page, "user1");
  await page.getByRole("link", { name: "+ Create Project" }).click();
  await page.locator("input").click();
  await page.locator("input").fill("example-project");
  await page.locator("textarea").click();
  await page.locator("textarea").fill("This is an example project for testing");
  await page.getByRole("button", { name: "Create" }).click();

  const newlyCreatedProjectLink = page.locator("section > a").first();
  await expect(newlyCreatedProjectLink).toBeVisible();
});
