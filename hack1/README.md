# 112-1-hack1

## Table of Contents

- [112-1-hack1](#112-1-hack1)
  - [Table of Contents](#table-of-contents)
  - [👀 Overview](#overview)
  - [🏃 Run the Project](#run-the-project)
    - [0. Verify Your Versions](#0-verify-your-versions)
    - [1. Clone the Project](#1-clone-the-project)
    - [2. Install Dependencies](#2-install-dependencies)
    - [3. Launch the Project](#3-launch-the-project)
    - [4. Test the Project](#4-test-the-project)
    - [5. Submit the Project](#5-submit-the-project)
  - [🈴 Grading Rules/ Reminders](#grading-rules-reminders)
  - [🌴 ****Project Structure****](#project-structure)
  - [Project Structure](#project-structure-1)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [TODO's](#todos)
    - [1. Title and Login Page (34%)](#1-title-and-login-page-34)
    - [2. View Page (24%)](#2-view-page-24)
      - [2.1 Render Posts (3%)](#21-render-posts-3)
      - [2.2 Navigation with Footer Buttons (8%)](#22-navigation-with-footer-buttons-8)
      - [2.3 Navigation with Keyboard Inputs (5%)](#23-navigation-with-keyboard-inputs-5)
      - [2.4 Handle Votes for Unvoted Posts (8%)](#24-handle-votes-for-unvoted-posts-8)
    - [3. Create Page (21%)](#3-create-page-21)
      - [3.1 Create a New Post With the Editor (5%)](#31-create-a-new-post-with-the-editor-5)
      - [3.2 View User Posts With Files Tab (8%)](#32-view-user-posts-with-files-tab-8)
    - [3.3 Edit User Posts With Editor (8%)](#33-edit-user-posts-with-editor-8)
    - [4. Settings - Profile Page (29%)](#4-settings---profile-page-29)
  - [📚 Resources](#resources)


## 👀 Overview

- **VSCoddit—VSCode & Reddit Mock App**
    
    
    Introducing VSCoddit, a unique and innovative fusion of two tech-centric worlds: Visual Studio Code and Reddit. VSCoddit brings together coding enthusiasts, developers, and tech aficionados in a vibrant online community where they can freely share and discuss their code snippets.
    
    At VSCoddit, users can create, share, and discover code snippets, just like you would post and engage with content on Reddit. Whether it's a brilliant solution to a programming problem, a clever code trick, or simply a fun project, VSCoddit provides a platform to showcase your coding skills and learn from others.
    
    One of the standout features of VSCoddit is the upvoting and downvoting system, allowing the community to recognize and promote high-quality code snippets while filtering out the less valuable ones. This system not only encourages contributors to provide meaningful and well-structured code but also helps users quickly identify the best content in the sea of submissions.
    
    Happy hacking!
    

1. Download Hack1 Folder.
    
    ```bash
    cd /path/to/same/level/with/wp1121
    git clone ...
    ```
    
2. Remove `.git` Folder and Move The Folder to `wp1121`.
    
    ```bash
    rm -rf ./hack1/.git
    mv ./hack1 ./wp1121
    ```
    
3. Read README!
4. [Search For TODO’s in Your Editor](https://www.notion.so/Hack1-README-Draft-da809f2ca66c4f36aa5e47081916121c?pvs=21).
5. Start Coding.
6. (Optional) Local Testing with Playwright.
7. (Optional) Failed Tests? Debug.
8. Done? Zip and Submit to [Gradescope](https://www.gradescope.com/courses/605052/assignments/3512234)

## 🏃 Run the Project

This project utilizes Yarn as its package manager and comprises both frontend and backend sub-projects. It also makes use of the `concurrently` package to execute multiple commands simultaneously. Below are the steps to run the project:

### 0. Verify Your Versions

```bash
node -v # Ensure it's 18.18.0 (recommended) or compatible (18.x.x)
yarn -v # Ensure it's 1.22.19 (recommended) or compatible (1.x.x)
```

### 1. Clone the Project

Open your terminal and clone the project using the following command:

```bash
cd wp1121 # Enter the wp1121 directory
git clone https://github.com/ntuee-web-programming/112-1-hack1-test.git hack1 # Clone the project
rm -rf hack1/.git # Remove the .git directory
```

### 2. Install Dependencies

To install dependencies for both the frontend and backend sub-projects, use:

```bash
yarn
```

This will concurrently execute the `install:frontend` and `install:backend` scripts.
If preferred, you can also install the dependencies for each sub-project separately.

### 3. Launch the Project

The default port for the frontend is `5173`, while the default port for the backend is `6969`. If you wish to change these ports, you can see `.env.example` for more details. Note that the `PORT` of backend must match the port in `VITE_API_URL` of frontend. You must set the `MONGO_URL` of backend before running the project.

To run the frontend and backend concurrently from the project's root directory, enter:

```bash
yarn dev
```

This will concurrently execute the `dev:frontend` and `dev:backend` scripts.

If preferred, you can also launch the frontend and backend individually.

By adhering to these steps, you should successfully run the project on your local machine.

### 4. Test the Project

We utilize Playwright for testing our project. To run the tests, execute:

```bash
yarn playwright install chromium # Install Chromium (if not already installed)
yarn playwright install-deps chromium # Install Chromium dependencies (if not already installed)
yarn test
```

You should run the test in a separate terminal from the terminal you run your service. Ensure you have launched the project (refer to step 3) before initiating the tests!

Other useful commands for testing include:

```bash
yarn test public-1 # Test tests/public-1.spec.ts only
yarn test --reporter=list # Only show the list of tests
yarn test --headed # Run the tests in a visible browser
yarn test --debug # Shortcut for "--timeout=0 --max-failures=1 --headed --workers=1"
```

### 5. Submit the Project

To ensure you receive full credit for your work, it's essential to submit your project to both Gradescope and GitHub.

<aside>
🚨 **!!!IMPORTANT!!!**
Not pushing your code to GitHub or failing to sign in will result in a 5% deduction from the total score.

</aside>

To submit the project, here is the recommended workflow:

```bash
git add .
git commit -m "Your commit message"
git archive -o hack1.zip HEAD # Create a zip file of your project
git push # Push your code to GitHub
```

Then, upload `hack1.zip` to Gradescope.

Gradescope Link: https://www.gradescope.com/courses/605052/assignments/3512234

## 🈴 Grading Rules/ Reminders

- **DO NOT** modify the `className` of any element in the HTML files. This is strictly for styling purposes. No points will be deducted for modifying the `className` attribute, but it's not recommended.
- **DO NOT** modify the `data-testid` attribute of any element in the HTML files. This is solely for testing purposes. If you modify this attribute, your tests may fail.
- You should **NOT** modify files that aren't mentioned in the TODO list. Any modifications to these files will be ignored during grading.
- Even though Gradescope may have graded your code during the test, **you must still push your code** to the main branch of your GitHub repo `wp1211/hack1` before Hack#1 concludes. If necessary, we will review your code. Failing to push the code before the deadline will result in a 5% deduction from the total score.
- If you're wondering where the TODOs are located, utilize the search function in your editor. The TODOs are labeled as `TODO #.#`. For instance, `TODO 1.1` pertains to the first subtask of task 1. If you're using VSCode, the shortcut `Ctrl+Shift+F` (Windows) or `Cmd+Shift+F` (Mac) will help you search for these TODOs. To see all TODOs, use regex `TODO \d\.\d:`. You can also search all warnings by searching for `Warning:`, which you should do before submitting your code.

## 🌴 ****Project Structure****

```bash
├── backend
│   ├── src
│   │   ├── controllers # Controllers for handling requests
│   │   │   ├── auth.ts # Controller for login and registration
│   │   │   ├── post.ts # Controller for post-related requests
│   │   │   └── user.ts # Controller for user-related requests
│   │   ├── models # Models for database
│   │   │   ├── post.ts
│   │   │   └── user.ts
│   │   ├── routes # Routes for handling requests
│   │   │   ├── auth.ts # Routes for login and registration
│   │   │   ├── init.ts # Route for initializing database
│   │   │   ├── post.ts
│   │   │   └── user.ts
│   │   ├── errors.ts # Error handling
│   │   ├── index.ts # Entry point
│   │   └── utils.ts # Utility functions
│   ├── .env.example
│   └── package.json
├── frontend
│   ├── public
│   │   └── vscoddit.svg # Vscoddit logo
│   ├── src
│   │   ├── components
│   │   │   ├── ui # UI components. You don't need to modify these.
│   │   │   │   └── ...
│   │   │   ├── PostCard.tsx # Post card component for view page
│   │   │   └── ViewFooter.tsx # Footer component for view page
│   │   ├── contexts
│   │   │   ├── PostContext.tsx # Context for view page
│   │   │   └── UserContext.tsx # Context for user information
│   │   ├── routes
│   │   │   ├── auth
│   │   │   │   ├── Layout.tsx # Layout for login and register pages
│   │   │   │   ├── Login.tsx # Login page: `/login`
│   │   │   │   └── Register.tsx # Register page: `/register`
│   │   │   ├── settings
│   │   │   │   ├── FAQ.tsx # FAQ page: `/settings/faq`
│   │   │   │   ├── Layout.tsx # Layout for settings pages
│   │   │   │   └── Profile.tsx # Profile page: `/settings/profile`
│   │   │   ├── Create.tsx # Create page: `/create`
│   │   │   ├── Layout.tsx # Layout for create and view pages
│   │   │   └── View.tsx # View page: `/view`
│   │   ├── services
│   │   │   ├── postService.ts # Service for post-related requests
│   │   │   └── userService.ts # Service for user-related requests
│   │   ├── App.tsx # Main app component
│   │   ├── globals.css # Global CSS
│   │   ├── main.tsx # Entry point
│   │   └── RootLayout.tsx # Root layout
│   ├── .env.example
│   ├── index.html # Base HTML file
│   └── package.json
├── shared
│   └── types.ts # Shared types
├── tests # Tests using Playwright
│   ├── public-1.spec.ts # Test for public-1
│   ├── public-2.spec.ts # Test for public-2
│   ├── public-3.spec.ts # Test for public-3
│   └── public-4.spec.ts # Test for public-4
├── package.json
└── README.md
```




## Project Structure

If you're not interested in the project's layout, skip to the [TODOs](#todos) section.

### Frontend

1. **Login Page**:

   <img src="https://github.com/ntuee-web-programming/112-1-unit1-todo-react/assets/74884625/68332b7c-bda7-48b3-abcb-81f197c3fc5b" alt="Login Page" style="max-width: 320px;">

   The login page features both login and register panels with a shared layout found in [`Layout.tsx`](frontend/src/routes/auth/Layout.tsx). Tabs at the top change based on the path name. The layout includes fields for username, password, and confirm password. The confirm password field is hidden in the login panel, so you should remove its `required` attribute. At the page's bottom is a submit button. Depending on the active panel, there's a link to switch between login and registration.

2. **View Page**:

   <img src="https://github.com/ntuee-web-programming/112-1-unit1-todo-react/assets/74884625/e7561d26-953f-45f5-a202-a674e10b4760" alt="View Page" style="max-width: 600px;">

   The view page displays a post with its title, content, author, and timestamp. Navigation buttons allow users to move between posts. Additionally, there are buttons for upvoting and downvoting. If a user has already upvoted, pressing the downvote button will reverse the upvote and then downvote the post. The page should also support keyboard navigation: the left arrow key takes the user to the previous post, while the right arrow key leads to the next one.

3. **Create Page**:

   <img src="https://github.com/ntuee-web-programming/112-1-unit1-todo-react/assets/74884625/0c6d0909-92b4-4b61-9cfc-85fdbb2b2b11" alt="Create Page" style="max-width: 600px;">

   The create page allows users to draft a new post. There's a title field, which is mandatory, and a content field that's optional. <!-- The submit button remains disabled until the title field is populated. After posting, users are directed to view their new content. -->

4. **Settings Page**:

   <img src="https://github.com/ntuee-web-programming/112-1-unit1-todo-react/assets/74884625/b2bc0a5e-919a-4360-bc2e-85d89d7a5e5c" alt="Settings Page" style="max-width: 600px;">

   The settings page provides users with options to personalize their profile. Upon loading, the current user settings are displayed. Here, users can update their username, bio, gender, and profile picture. As selections are made, the user interface reflects these changes in real-time. Notably, when a new profile picture is uploaded, it immediately replaces the current display. If no image is chosen, the existing profile picture remains. If the user never set a picture, the space stays blank.

### Backend

1. The backend structure closely resembles that of the Trello clone app. If you're familiar with its backend code, this should be straightforward. The `models` folder manages both users and posts, while the `controllers` folder handles requests from the frontend. An additional `auth` controller specifically manages login and registration. The `routes` folder oversees all routing, including a unique `init` route to initialize the database during tests.

## TODO's


![](https://media.discordapp.net/attachments/893439505988743178/1161825719907782696/Hack1_README_Draft.png?ex=6539b585&is=65274085&hm=45caf5e21a5c3bd96216bb253c69fa8de0a749cee599cbaa0806623dd468ee2c&=&width=1316&height=1210)

We've laid out four main tasks for you, each containing a series of subtasks. The main tasks are independent of each other. Therefore, if you find yourself stuck on a particular task, feel free to jump to the next. However, some subtasks may rely on the completion of previous ones. For instance, finishing subtask 1.4 is a prerequisite for 1.5. We've indicated which files you'll need to modify for each subtask, arranged in the recommended order of completion. To locate relevant tasks in your editor, simply search for `TODO #.#`.

### 1. Title and Login Page (34%)

- [ ] 1.1 Title and Login Page Title (5%)

  - [`index.html`](frontend/index.html)
  - [`Layout.tsx`](frontend/src/routes/auth/Layout.tsx)

- [ ] 1.2 Redirect to Login Page (5%)

  - [`UserContext.tsx`](frontend/src/contexts/UserContext.tsx)

- [ ] 1.3 Route Configuration for Login and Register Pages (8%)

  - [`Layout.tsx`](frontend/src/routes/auth/Layout.tsx)
  - [`Login.tsx`](frontend/src/routes/auth/Login.tsx)
  - [`Register.tsx`](frontend/src/routes/auth/Register.tsx)

- [ ] 1.4 Login Fails for Unregistered Users (8%)

  - [`Layout.tsx`](frontend/src/routes/auth/Layout.tsx)

- [ ] 1.5 Ensure User Registration Functions Properly (8%)

  - [`Layout.tsx`](frontend/src/routes/auth/Layout.tsx)
  - [`user.ts`](backend/src/controllers/user.ts)


### 2. View Page (24%)

#### 2.1 Render Posts (3%)

![](https://media.discordapp.net/attachments/893439505988743178/1161825720293654528/Hack1_README_Draft_1..png?ex=6539b585&is=65274085&hm=a35d2ae34614d497e79a45cefd6c7a84bbaa7dc1b9ef863499d97edba754adb7&=&width=1612&height=1210)

**Requirements**

1. Render author
2. Render posted date
3. Render title
4. Render content

**Hints**

- 2.1.1: Pass correct arguments to `PostCard` component c.f. `PostContext`
- 2.1.2: Arguments `post` should be modified

#### 2.2 Navigation with Footer Buttons (8%)

![](https://media.discordapp.net/attachments/893439505988743178/1161826003828604989/Hack1_README_Draft_2..png?ex=6539b5c8&is=652740c8&hm=d411de1d574443908af2c35cd7512026e0bda4b89787316c2efb19c0cc5ec001&=&width=1612&height=1210)

**Requirements**

1. Navigate to next post when “Next Button” is clicked.
2. Navigate to previous post when “Prev Button” is clicked.
3. Navigate to the **first post** when “Next Button”  is clicked at the **last post**.
4. Navigate to the **last post** when “Prev Button” is clicked at the **first post**.

**Hints**

- 2.2.1: Link page index to React state
- 2.2.2: Pass correct arguments to `ViewFooter` component
- 2.2.3: Arguments `nextClickHandler` and `prevClickHandler` should be modified
- 2.2.4: Finish next and prev click handler
- 2.2.5: Refer to `PostContext` for more clue

#### 2.3 Navigation with Keyboard Inputs (5%)

**Requirements**

1. Navigate to next post when “Right Arrow Key” is pressed.
2. Navigate to previous post when “Left Arrow Key” is pressed.
3. Navigate to the **first post** when “Right Arrow Key”  is pressed at the **last post**.
4. Navigate to the **last post** when “Left Arrow Key” is pressed at the **first post**.

#### 2.4 Handle Votes for Unvoted Posts (8%)

![Untitled](https://media.discordapp.net/attachments/893439505988743178/1161826756991389706/Untitled.png?ex=6539b67c&is=6527417c&hm=fadaa2e10fa24b8453842867105da01bd2442e3bf3ba6a9dc2f2e873ab060363&=&width=1612&height=1210)

**Requirements**

1. Vote icon will be filled once clicked.

**Hints**

- 2.4.1: Determine if the current user has upvoted or downvoted the selected post
- 2.4.2: Refer to the schema of `Post` for more clue
- 2.4.3: Call some exported function from `PostContext`
- 2.4.4: Pass correct arguments to `ViewFooter` component
- 2.4.5: Arguments `downvoteClickHandler`, `upvoteClickHandler`, `hasUpvoted`, `hasDownvoted` and `totalVotes` should be Modified

### 3. Create Page (21%)

#### 3.1 Create a New Post With the Editor (5%)

![](https://media.discordapp.net/attachments/893439505988743178/1161827094901297152/Untitled.png?ex=6539b6cd&is=652741cd&hm=67905d87f93589b81607969082a21f5261dc1cf6f79c897dabde921188392dc5&=&width=1612&height=1210)

**Requirements**

1. React state `title` reflects changes in the filename input field.
2. React state `code` reflects changes in the editor.
3. Post will be created and stored in database once the “Post Button” is clicked.

**Hints**

- 3.1.1: Argument `onChange` and `value` of `Input` component should be modified
- 3.1.2: Argument `onChange` of `Editor` component should be modified

#### 3.2 View User Posts With Files Tab (8%)

![](https://media.discordapp.net/attachments/893439505988743178/1161827291739996170/Hack1_README_Draft_5..png?ex=6539b6fc&is=652741fc&hm=9de75167c1e44427644f686a61b942b9db4aac01d6bed0e3ed158b1d10583f2c&=&width=1612&height=1210)

**Requirements**

1. Render a list of posts that the logged in user has posted.
2. Navigate to corresponding post once any file tab is clicked.

**Hints**

- 3.2.1: Use `getPostIndicesByUserId` from `PostContext` to fetch logged in user's post indices
- 3.2.2: Get post data with `getPostByIndex` from `PostContext`
- 3.2.3: Display post title here

### 3.3 Edit User Posts With Editor (8%)

**Requirements**

1. Navigate to corresponding post and allow edit once any file tab is clicked.
2. Changes will be saved once the “Post Button” is clicked.

**Hints**

- 3.3.1: Use the correct API from `PostService` to update DB
- 3.3.2: Use React hook to update frontend

**Hint:** If tasks 1.4 and 1.5 fail but succeeded previously, consider clearing your database and restarting your backend server.

### 4. Settings - Profile Page (29%)

- [ ] 4.1 Render User Information - bio (4%)

  - [`Profile.tsx`](frontend/src/routes/settings/Profile.tsx)

- [ ] 4.2 Render User Information - gender (8%)

  - [`Profile.tsx`](frontend/src/routes/settings/Profile.tsx)

- [ ] 4.3 Render User Information - profile picture 1 (6%)

  - [`Profile.tsx`](frontend/src/routes/settings/Profile.tsx)

- [ ] 4.4 Update User Information (6%)

  - [`user.ts`](backend/src/controllers/user.ts)

- [ ] 4.5 Render User Information - profile picture 2 (5%)

  - [`Profile.tsx`](frontend/src/routes/settings/Profile.tsx)



## 📚 Resources

- [Playwright](https://playwright.dev/docs/intro)
    
    <aside>
    💡 **ChatGPT Lesson**
    
    Playwright is an open-source automation framework for web browsers like Chrome, Firefox, and WebKit. It allows developers to automate interactions with web pages, such as filling out forms, clicking buttons, and navigating between pages. Playwright provides a simple and powerful API for browser automation and is often used for web testing, web scraping, and other web automation tasks. It supports multiple programming languages and offers cross-browser compatibility.
    
    Here's a basic example of using Playwright in JavaScript to open a webpage, fill out a form, and capture a screenshot:
    
    ```jsx
    const { chromium } = require('playwright');
    
    (async () => {
      const browser = await chromium.launch();
      const page = await browser.newPage();
    
      await page.goto('<https://example.com>');
    
      // Fill out a form
      await page.fill('input[name="username"]', 'yourusername');
      await page.fill('input[name="password"]', 'yourpassword');
      await page.click('input[type="submit"]');
    
      // Capture a screenshot
      await page.screenshot({ path: 'example.png' });
    
      await browser.close();
    })();
    ```
    
    In this example, Playwright is used to open a Chromium browser, navigate to "[https://example.com](https://example.com/)", fill out a username and password field, submit the form, and then capture a screenshot of the resulting page.
    
    </aside>
    
- [Template Literals](https://www.w3schools.com/js/js_string_templates.asp)
    
    <aside>
    💡 **ChatGPT Lesson**
    
    Template literals in JavaScript are a way to create strings that can include variables and expressions within them, using backticks (``) as delimiters. They allow for more readable and convenient string formatting. Here's a brief example:
    
    ```jsx
    const name = "John";
    const age = 30;
    
    const message = `My name is ${name} and I am ${age} years old.`;
    
    console.log(message);
    
    ```
    
    In this example, the `${}` syntax within the backticks allows you to insert the values of `name` and `age` variables into the string, creating a dynamic message.
    
    </aside>
    
- [React Router Dom](https://reactrouter.com/en/main/start/overview)
    
    <aside>
    💡 **ChatGPT Lesson**
    
    React Router DOM is a JavaScript library for handling routing in React applications. It allows you to create and manage navigation within your single-page React web application (SPA). You can define different routes and render components based on the URL, enabling a seamless user experience. React Router DOM provides components like `BrowserRouter`, `Route`, and `Link` for routing functionality.
    
    </aside>
    
- `[useForm` Hook](https://react-hook-form.com/docs/useform)
    
    <aside>
    💡 **ChatGPT Lesson**
    
    The `useForm` hook is not a standard React hook, but it might refer to a custom hook or library like "react-hook-form" or "Formik" used for managing forms in React. These libraries simplify form handling by providing hooks and utilities to manage form state, validation, and submission. They make it easier to interact with form elements, capture user input, and manage the form's state in a more organized and efficient manner.
    
    </aside>
    
- [Manaco Editor](https://microsoft.github.io/monaco-editor/docs.html)