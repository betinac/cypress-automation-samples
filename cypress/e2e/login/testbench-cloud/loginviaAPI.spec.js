let SESSION_TOKEN
describe('Log in via the API', () => {
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
