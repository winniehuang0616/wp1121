import type { Page } from "@playwright/test";

export const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const prefetch = async () => {
  /* Fetch every page and wait for it to load */
  /* since Next.js first loads are slow */
  // process.stdout.write('\nPrefetching all pages ...');
  await fetch(`${baseURL}/`);
  await fetch(`${baseURL}/auth`);
  await fetch(`${baseURL}/projects`);
  await fetch(`${baseURL}/projects/1`);
  await fetch(`${baseURL}/projects/create`);
  // process.stdout.write('\r\x1b[1A');

  /* Initialize the database for one spec */
};

export const signOut = async (page: Page) => {
  await page.waitForTimeout(1000);
  const signOutButton = page.getByTestId("sign-out-button");
  await signOutButton.click();
  await page.waitForURL("/auth");
};

export const addTask = async (page: Page, taskTitle: string) => {
  const taskTitleInput = page.locator("#task-title-input");
  const addTaskButton = page.getByTestId("add-task-button");
  await taskTitleInput.click();
  await taskTitleInput.fill(taskTitle);
  await addTaskButton.click();
};

export const createProject = async (page: Page, projectName: string) => {
  await page.getByRole("link", { name: "+ Create Project" }).click();
  await page.locator("input").click();
  await page.locator("input").fill(projectName);
  await page.getByRole("button", { name: "Create" }).click();
  const newlyCreatedProjectLink = page.locator("section > a").first();
  await newlyCreatedProjectLink.click();
};

export const signInDummyUser = async (page: Page, username: string) => {
  await page.goto(`${baseURL}/`);
  await page.waitForURL(`/auth`);
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill(`${username}@gmail.com`);
  await page.getByLabel("Password", { exact: true }).click();
  await page
    .getByLabel("Password", { exact: true })
    .fill(`password-${username}`);
  await page.getByTestId("auth-submit-button").click();
  await page.waitForURL(`/projects`);
};

export const signUpDummyUser = async (page: Page, username: string) => {
  await page.goto(`${baseURL}/`);
  await page.waitForURL(`/auth`);
  await page.getByTestId("sign-in-up-button").click();
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill(`${username}@gmail.com`);
  await page.getByLabel("Name").click();
  await page.getByLabel("Name").fill(username);
  await page.getByLabel("Password", { exact: true }).click();
  await page
    .getByLabel("Password", { exact: true })
    .fill(`password-${username}`);
  await page.getByLabel("Confirm Password").click();
  await page.getByLabel("Confirm Password").fill(`password-${username}`);
  await page.getByTestId("auth-submit-button").click();
  await page.waitForURL(`/projects`);
};

/* Setup the page before each test */
export const setup = async (page: Page) => {
  /* setup the database for single test */
  await page.goto(`${baseURL}/api/clear-db`);
};

export const validateHashedPassword = async () => {
  const res = await fetch(`${baseURL}/api/password`);
  if (res) {
    const data: { password: string } = await res.json();
    const isValid = data.password.match(
      /^\$2[aby]?\$\d{1,2}\$[./A-Za-z0-9]{53}$/,
    );
    if (!isValid) throw Error("invalid");
  }
};
