# UI testing
## Testing the login functionality
* I implemented a new Cypress custom command to log in a user via the UI called: `loginUI` and you can invoke it like `cy.loginUI()` with 3 parameters: the "User login",the "Password" and the "Team workspace (a.k.a tenantID)
* The login custom command will type the credentials one by one in the main form and then click on the Login button.
* Every new custom command needs to be added to the `cypress/support/commands` folder within the `index.js` file.

## Testing the logout functionality
* I implemented a new Cypress custom command to log out the user via the UI called: `logoutUI` and you can invoke it like `cy.logoutUI()`
* The `tenantId` value can be extracted from the `window.localStorage`.
* The new custom command is also added to the `cypress/support/commands` folder within the `index.js` file.
