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

### Example of a mochawesome report

- [GitHub Summary Report when there are no failures](images/gh-summary-passed.png)
- [GitHub Summary Report when there are some failures](images/gh-summary-failures.png)

- [Published Mochawesome Report with no failures](images/index-html.png)
- [Published Mochawesome Report with failures](images/report-with-failures.png)

### Example of tests running in Chrome, Firefox and Edge browsers

- [Cross-browser test execution](images/cross-browsers-testing.png)
