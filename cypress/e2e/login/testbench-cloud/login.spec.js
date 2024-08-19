describe('Regular login via the UI', () => {
  const login = {
    emailAddress: Cypress.env('email'),
    password: Cypress.env('password'),
    userName: Cypress.env('userName'),
    tenantID: Cypress.env('tenantID'),
  }

  beforeEach(() => {
    cy.intercept('POST', '/api/tenants/login/session').as('verifyUser')
    cy.log(`**--- Log in with regular user's credentials via the UI---**`)

    // Let's cache the browser context linked to the user
    // and reuse it for multiple tests
    cy.session(login.emailAddress, () => {
      cy.loginUI(login.emailAddress, login.password, login.tenantID)
      cy.waitAndAssertStatusCode('verifyUser', 201)
      cy.log(`**--- User is logged in ---**`)
    })
  })

  after(() => {
    cy.log('**--- Log out the user (via UI) ---**')
    cy.logoutUI()
  })
  it('Checks a regular User can access the app', { tags: '@loginUI' }, () => {
    cy.visit(`${Cypress.config().baseUrl}/en/products`)
    cy.url().should('include', '/products')
    cy.log(`**--- Verify user's name---**`)
    cy.get("[data-cy='user-menu-user-name']").should(
      'have.text',
      login.userName,
    )
  })
})
