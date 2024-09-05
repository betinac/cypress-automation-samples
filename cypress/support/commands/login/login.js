Cypress.Commands.add('loginUI', (email, password, tenantID) => {
  cy.intercept('POST', '/api/tenants/login/session').as('verifyUser')
  /*
   * Let's set up a session to log in once, cache the browser context linked to the user
   * and reuse it for multiple tests. Cypress will remember your cookies
   * and local storage state from this session for reuse across tests.
   */
  cy.session('TestBench login', () => {
    cy.visit(`${Cypress.config().baseUrl}/en/login`)
    cy.get("[data-cy='tenant-input']").type(tenantID, { delay: 0 })
    cy.get("[data-cy='login-input']").type(email, { log: false, delay: 0 })
    cy.get("[data-cy='password-input']").type(password, {
      log: false,
      delay: 0,
    })
    cy.get("[data-cy='login-button']").click()
    cy.waitAndAssertStatusCode('verifyUser', 201)
    cy.url().should('include', '/products')
  })
})

Cypress.Commands.add(
  'checkInvalidCredentials',
  (email, password, tenantID, statusCode) => {
    if (!statusCode) {
      statusCode = 400
    }
    cy.get("[data-cy='tenant-input']").type(tenantID, { delay: 0 })
    cy.get("[data-cy='login-input']").type(email, { log: false, delay: 0 })
    cy.get("[data-cy='password-input']").type(password, {
      log: false,
      delay: 0,
    })
    cy.get("[data-cy='login-button']").click()
    cy.waitAndAssertStatusCode('verifyUser', statusCode)
  },
)

Cypress.Commands.add('loginOrangeHrmUI', (username, password, url) => {
  cy.intercept(
    'POST',
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
  ).as('validateUser')

  /*
   * Let's set up a session to log in once, cache the browser context linked to the user
   * and reuse it for multiple tests. Cypress will remember your cookies
   * and local storage state from this session for reuse across tests.
   */
  cy.session('OrangeHRM login', () => {
    cy.visit(url)
    cy.log(`u: ${username}, p: ${password}`)
    cy.get("[name='username']").clear().type(username, { log: false })
    cy.get("[type='password']").clear().type(password, { log: false })
    cy.get("[type='submit']").click()
    cy.waitAndAssertStatusCode('validateUser', 302)
    cy.url().should('include', '/dashboard')
  })
})
