# cypress-automation-samples

This is a Cypress repo where you can find several test examples and the automation testing strategy associated to them.

## Requirements
- You will need an account on the app I'm using for testing: **TestBench Cloud** (Or use any other but adjust the code appropriately)

## Project setup with Cypress
### Clone the project
- Access the following URL: https://github.com/betinac/cypress-automation-samples
- Click on the `Code` button
- Choose one of the options to clone the repository (i.e clone with SSH)
- Click on the 'Copy url to clipboard' icon
- In a terminal, go to the folder where you keep your projects and type: `git clone [URL copied in the previous step]` and hit ENTER
- Go to the cloned repository: `cd cypress-automation-samples`

### Installing dependencies
- In the terminal and within the repository folder `cd cypress-automation-samples`, run the following command `npm install`. This command will download all the dependencies from the `package.json` file (it will create a `node_modules` directory)

### Initializing Cypress
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
# Pull Requests
* [Suggested structure](https://github.com/betinac/cypress-automation-samples/pull/2) for a Pull Request (PR) description field

# UI testing
## Testing the login functionality
* I implemented a new Cypress custom command to log in a user via the UI called: `loginUI` and you can invoke it like `cy.loginUI()` with 3 parameters: the "User login",the "Password" and the "Team workspace (a.k.a tenantID)
* The login custom command will type the credentials one by one in the main form and then click on the Login button.
* Every new custom command needs to be added to the `cypress/support/commands` folder within the `index.js` file.

## Testing the logout functionality
* I implemented a new Cypress custom command to log out the user via the UI called: `logoutUI` and you can invoke it like `cy.logoutUI()`
* The `tenantId` value can be extracted from the `window.localStorage`.
* The new custom command is also added to the `cypress/support/commands` folder within the `index.js` file.

# API testing
* As I know I will be logging in and out the app several times while testing other scenarios, it's much faster to do so if we just call the API in stead of filling in the Login form every time.

## Testing the login functionality
* I created a new test `loginviaAPI.spec.cy` that will log in a user but via the API instead of using the UI. 
* The new `loginViaAPI` Cypress custom command will send a `POST` request to the `${APP_URL}/api/tenants/login/session` URL with the required credentials. 
* After asserting that the request returned a `201` status code in the response, we need to set up a couple of fields in the Local Storage, including the session token.
* The test finishes by visiting the Home page of the app and asserting the name of the user is rendered, showing that the login request was successfully done and we can continue testing from there. 
* The new custom command is also added to the `cypress/support/commands` folder within the `index.js` file.


## Testing the logout functionality
* The `logoutViaAPI` Cypress custom command allows the user to log out without clicking any elements in the UI. We will just send a `DELETE` request together with the `tenantId` as a path variable, which we will obtain from the Local Storage.
* We finally assert a successfull response with `204` as status code.
* The new custom command is also added to the `cypress/support/commands` folder within the `index.js` file.
