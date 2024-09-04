# GitHub Actions

I'll use this continuous integration and continuous delivery (CI/CD) platform to automate several actions.

## Run Prettier on every `git push`

Run this formatting task, and if there were any changed files, commit them to the source repository.

Find the recipe here: `.github/workflows/format-prettier.yml`

## Manually run E2E Cypress tests

Manually run the Cypress end-to-end tests with the built-in Electron browser, and provide a test summary after completion by using the Mochawesome reporting tool.

I've installed these 3 dependencies:

- mochawesome
- mochawesome-merge
- mochawesome-report-generator

I've created 3 scripts to merge and deploy the test results:

- report:copyAssets
- report:merge
- report:generate

The final report is published in a GitHub Page: https://betinac.github.io/cypress-automation-samples/

Find the recipe here: `.github/workflows/manually-run-cypress-tests.yml`
