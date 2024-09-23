/*
  Heads up! Unfortunately, the TestBench Cloud app that I used for automating 
  the login tests, has been retired from the market in August, 2024. I've 
  skipped the tests and left them as an example, but they can't be run anymore.
*/
describe.skip('Attempt to log in via the UI while mocking the response', () => {
  // Get credentials from cypress.env.json file
  const login = {
    emailAddress: Cypress.env('email'),
    password: Cypress.env('password'),
    userName: Cypress.env('userName'),
    tenantID: Cypress.env('tenantID'),
  }

  it(
    'Should display an error message even with valid credentials (mocked)',
    { tags: ['@loginAPI', '@mocked'] },
    () => {
      // Mock the login API response as being unauthorized
      cy.intercept('POST', '/api/tenants/login/session', {
        statusCode: 403,
        body: {
          failureType: 'LoginFailedIncorrectData',
          message: 'Incorrect workspace, login or password.',
        },
      }).as('verifyUser')

      cy.visit(`${Cypress.config().baseUrl}/en/login`)

      // Enter valid credentials, the user should not be logged in
      // as we have mocked the response of the intercepted API
      cy.checkInvalidCredentials(
        login.emailAddress,
        login.password,
        login.tenantID,
        403,
      )

      // Validate that the error message is displayed
      cy.contains(
        'Please enter a matching set of workspace, user login and password.',
      ).should('be.visible')
      // Verify that the URL has not changed
      cy.url().should('include', '/login')
    },
  )
})
