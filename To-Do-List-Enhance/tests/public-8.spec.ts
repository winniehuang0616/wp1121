import { expect, test } from "@playwright/test";

import {
  addTask,
  createProject,
  signInDummyUser,
  signOut,
  signUpDummyUser,
} from "./utils";

test("8. Select the correct project by userId and projectId", async ({
  page,
}) => {
  await signUpDummyUser(page, "user1");
  await createProject(page, "user1-project");
  await addTask(page, "user1-task1");
  await addTask(page, "user1-task2");

  await signOut(page);

  await signUpDummyUser(page, "user2");
  await createProject(page, "user2-project");
  await addTask(page, "user2-task1");
  await addTask(page, "user2-task2");

  const user1Task1TitleHeading = page.getByRole("heading", {
    name: "user1-task1",
  });
  const user1Task2TitleHeading = page.getByRole("heading", {
    name: "user1-task2",
  });
  await expect(user1Task1TitleHeading).toBeVisible({ visible: false });
  await expect(user1Task2TitleHeading).toBeVisible({ visible: false });

  await signOut(page);

  await signInDummyUser(page, "user1");
  const user1ProjectLink = page.getByRole("link", { name: "user1-project" });
  await user1ProjectLink.click();

  const user2Task1TitleHeading = page.getByRole("heading", {
    name: "user2-task1",
  });
  const user2Task2TitleHeading = page.getByRole("heading", {
    name: "user2-task2",
  });
  await expect(user2Task1TitleHeading).toBeVisible({ visible: false });
  await expect(user2Task2TitleHeading).toBeVisible({ visible: false });
});
