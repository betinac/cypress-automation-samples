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
