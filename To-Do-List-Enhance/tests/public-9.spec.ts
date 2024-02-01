import { expect, test } from "@playwright/test";

import { addTask, createProject, signUpDummyUser } from "./utils";

test("9. Update the task's `completed` column", async ({ page }) => {
  await signUpDummyUser(page, "user1");

  await createProject(page, "example-project");

  await addTask(page, "Task 1");
  const task1Checkbox = page
    .locator("div")
    .filter({ hasText: /^Task 1delete$/ })
    .getByRole("checkbox");
  await task1Checkbox.click();
  await expect(task1Checkbox).toBeChecked();

  await addTask(page, "Task 2");
  const task2Checkbox = page
    .locator("div")
    .filter({ hasText: /^Task 2delete$/ })
    .getByRole("checkbox");
  await task2Checkbox.click();
  await expect(task2Checkbox).toBeChecked();
});
