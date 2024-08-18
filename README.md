# cypress-automation-samples

This is a Cypress repo where you can find several test examples and the automation testing strategy associated to them.

## Project setup with Cypress
### Clone the project
- Access the following URL: https://github.com/betinac/cypress-automation-samples
- Click on the `Code` button
- Choose one of the options to clone the repository (i.e clone with SSH)
- Click on the `Copy url to clipboard` icon
- In a terminal, go to the folder where you keep your projects and type: `git clone [URL copied in the previous step]` and hit `ENTER`
- Go to the cloned repository: `cd cypress-automation-samples`

### Installing dependencies
- In the terminal and within the repository folder `cd cypress-automation-samples`, run the following command `npm install`. This command will download all the dependencies from the `package.json` file (it will create a `node_modules` directory)

### Initializing Cypress
#### Requirements
- Just for running the tests under the `/e2e/login` folder, you'll need an account on the app I'm using for testing: **TestBench Cloud** (or email me and I can temporary share one of mine).

- On the project root path, create a new file called `cypress.env.json` and replace the variables with the credentials from your own TestBench Cloud account.

_For example:_
```
//cypress.env.json file's content
{
    "userName": "My User Name",
    "email": "my-user",
    "password": "s3creT-p@ssw0rd",
    "tenantID": "HS"
}
```

## How to run the tests
- In the terminal run `npx cypress open` or `npm exec cypress open`. This command will open the Cypress Test Runner (interactive mode).

---
# Summary of my automated tests
- [Pull requests](cypress/docs/Pull-Requests.md): check a suggested structure for a Pull Request (PR).

- [UI Testing](cypress/docs/UI-testing.md): check scenarios that I've automated via the UI.

- [API Testing](cypress/docs/API-testing.md): check scenarios that I've automated via the API.

- [Filter tests](cypress/docs/Filter-tests.md): filter and run tests by a substring or Tags.
