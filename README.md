# Cypress [![Cypress Version](https://img.shields.io/badge/Cypress-v13.11.0-brightgreen)](https://www.cypress.io/)

<p align="center">
  <img src="https://cdn.deliciousbrains.com/content/uploads/2018/09/28135025/db-End2EndTestingCypress-1540x748.jpg.webp"></img>
</p>

🚀 Welcome to my **Cypress** repository where you can find several test examples that I've implemented, and the automation testing strategy I've used on them.

# Table of Contents

- [Project setup with Cypress](#project-setup-with-cypress)
- [How to run the tests](#how-to-run-the-tests)
- [Summary of my automated tests](#summary-of-my-automated-tests)

## Project setup with Cypress

### Clone the project

- Access the following URL: https://github.com/betinac/cypress-automation-samples
- Click on the `Code` button
- Choose one of the options to clone the repository (i.e clone with SSH)
- Click on the `Copy url to clipboard` icon
- In a terminal, go to the folder where you keep your projects and type: `git clone [URL copied in the previous step]` and hit `ENTER`
- Go to the cloned repository: `cd cypress-automation-samples`

### Pre-requisites

- Before starting, please make sure you have the following tools installed in your system:

  - **Node.js**. You can download it from [this link](https://nodejs.org/en/download/package-manager).

### Installing dependencies

- In the terminal and within the repository folder `cd cypress-automation-samples`, run the following command `npm install`.
- This command will download all the dependencies listed in the `package.json` file and it will create a `node_modules` directory.

### Initializing Cypress

#### Requirements & Configuration

- Just for running the login tests under the `/e2e/login` folder, you'll need an account on the sandbox app I'm using for testing: **POCO Mega Store**. [Create your new account first](https://ecommerce-playground.lambdatest.io/index.php?route=account/account) and then save your credentials.

- On the project root path, create a new file called `cypress.env.json` and replace the variables with the credentials from the step above.

_For example:_

```
//cypress.env.json file's content
{
    "username": "my-user",
    "password": "s3creT-p@ssw0rd"
}
```

## How to run the tests

- In the terminal run `npx cypress open` or `npm exec cypress open`. These commands will open the Cypress Test Runner (interactive mode).
- Another option is to use the scripts from the `package.json` file:
  - `npm run cy:open` - Opens the Cypress Test Runner app
  - `npm run cy:run` - Run the tests in the command line
- To manually run the tests and also generate a Summary Report:
  - `npx cypress open  --browser chrome --reporter mochawesome`
- Clear the local files that will be generated and then run the following commands\*:
  1. `npm run delete:reports`
  2. `npm run cy:run`
  3. `npm run report:copyAssets`
  4. `npm run report:merge`
  5. `npm run report:generate`
  6. Open the `public/index.html` file that is stored under the root folder. [Mochawesome report](cypress/docs/images/index-html.png)

_(\*) Check the `package.json` file for more details on what each script is doing. I've left them separated on purpose._

---

# Summary of my automated tests

- [UI Testing](cypress/docs/UI-testing.md): check scenarios that I've automated via the UI.

- [API Testing](cypress/docs/API-testing.md): check scenarios that I've automated via the API.

- [Filter tests](cypress/docs/Filter-tests.md): filter and run tests by a substring or Tags.

## Complementing my automated tests

- [Pull requests template](cypress/docs/Pull-Requests.md): check a suggested structure for a Pull Request (PR).

- [Continuous Integration for E2E Cypress tests & GitHub Actions](cypress/docs/Workflows.md): use the continuous integration and continuous delivery (CI/CD) platform to automate several actions.

- [Prettier & VSCode & Cypress](cypress/docs/Format.md): configure JavaScript code auto-formatting with Prettier to work per project.
