import { test } from "@playwright/test";
import { examineLoremPost, expectIcon, login, setup } from "./utils";

test("2.1 Render Post With PostCard and PostContext (3%)", async ({ page }) => {
  await setup();
  await login(page);
  await examineLoremPost(page, 0);
});

test("2.2 Navigation with ViewFooter Buttons (8%)", async ({ page }) => {
  await login(page);
  const prevButton = page.getByTestId("prev-btn");
  const nextButton = page.getByTestId("next-btn");

  await examineLoremPost(page, 0);
  await nextButton.click();
  await examineLoremPost(page, 1);
  await nextButton.click();
  await examineLoremPost(page, 0);
  await nextButton.click();
  await examineLoremPost(page, 1);
  await prevButton.click();
  await examineLoremPost(page, 0);
  await prevButton.click();
  await examineLoremPost(page, 1);
  await prevButton.click();
  await examineLoremPost(page, 0);
  await prevButton.click();
  await nextButton.click();
  await examineLoremPost(page, 0);
  await nextButton.click();
  await prevButton.click();
  await nextButton.click();
  await examineLoremPost(page, 1);
});

test("2.3 Navigation with Keyboard (5%)", async ({ page }) => {
  await login(page);

  await examineLoremPost(page, 0);
  await page.keyboard.press("ArrowRight");
  await examineLoremPost(page, 1);
  await page.keyboard.press("ArrowRight");
  await examineLoremPost(page, 0);
  await page.keyboard.press("ArrowRight");
  await examineLoremPost(page, 1);
  await page.keyboard.press("ArrowLeft");
  await examineLoremPost(page, 0);
  await page.keyboard.press("ArrowLeft");
  await examineLoremPost(page, 1);
  await page.keyboard.press("ArrowLeft");
  await examineLoremPost(page, 0);
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowRight");
  await examineLoremPost(page, 0);
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowRight");
  await examineLoremPost(page, 1);
});

test("2.4 Handle Voting for Unvoted Posts (8%)", async ({ page }) => {
  const upvoteButton = page.getByTestId("upvote-btn");
  const nextButton = page.getByTestId("next-btn");
  const downvoteButton = page.getByTestId("downvote-btn");

  await login(page);
  await upvoteButton.click();
  await expectIcon(page, "upvote", "filled");
  await nextButton.click();
  await downvoteButton.click();
  await expectIcon(page, "downvote", "filled");
});
