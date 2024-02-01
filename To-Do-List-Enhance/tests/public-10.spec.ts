import { expect, test } from "@playwright/test";

import { addTask, createProject, signUpDummyUser } from "./utils";

test("10. Delete the task whose displayId is `taskId`", async ({ page }) => {
  await signUpDummyUser(page, "user1");

  await createProject(page, "example-project");
  await addTask(page, "Task 1");
  await addTask(page, "Task 2");
  await addTask(page, "Task 3");

  const task1DeleteButton = page
    .locator("div")
    .filter({ hasText: /^Task 1delete$/ })
    .getByRole("button");
  await task1DeleteButton.click();

  const task1Title = page.getByRole("heading", { name: "Task 1" });
  await expect(task1Title).toBeVisible({ visible: false });

  const task2DeleteButton = page
    .locator("div")
    .filter({ hasText: /^Task 2delete$/ })
    .getByRole("button");
  await task2DeleteButton.click();

  const task2Title = page.getByRole("heading", { name: "Task 2" });
  await expect(task2Title).toBeVisible({ visible: false });
});
