/*
  Heads up! Unfortunately, the TestBench Cloud app that I used for automating 
  the login tests, has been retired from the market in August, 2024. I've 
  skipped the tests and left them as an example, but they can't be run anymore.
*/
let SESSION_TOKEN
describe.skip('Log in via the API', () => {
  // Get credentials from cypress.env.json file
  const login = {
    emailAddress: Cypress.env('email'),
    password: Cypress.env('password'),
    userName: Cypress.env('userName'),
    tenantID: Cypress.env('tenantID'),
  }

  beforeEach(() => {
    cy.log(`**--- Log in with regular user's credentials via the API---**`)
    cy.session(login.emailAddress, () => {
      cy.loginViaAPI(login.emailAddress, login.password, login.tenantID).then(
        (newSessionToken) => {
          SESSION_TOKEN = newSessionToken
          cy.log(`**The new token is: ${SESSION_TOKEN}**`)
        },
      )
    })
  })

  it(
    'Checks a regular User can access the app',
    { tags: '@loginAPI' },
    function () {
      cy.visit(`${Cypress.config().baseUrl}/en/products`)
      cy.url().should('include', '/products')
      cy.log(`**--- Verify user's name---**`)
      cy.get("[data-cy='user-menu-user-name']").should(
        'have.text',
        login.userName,
      )
    },
  )
  it(
    'Checks a regular User can log out from the app',
    { tags: ['@logoutUI', '@regression'] },
    () => {
      cy.visit(`${Cypress.config().baseUrl}/en/products`)
      cy.log('**--- Log out the user (via API) ---**')
      cy.logoutViaAPI(SESSION_TOKEN)
    },
  )
})
