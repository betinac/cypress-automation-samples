Cypress.Commands.add('logoutUI', () => {
  const login = {
    userName: Cypress.env('userName'),
    tenantId: window.localStorage.getItem('tenantId'),
  }
  cy.intercept(
    'DELETE',
    `/api/tenants/${login.tenantId.toString()}/login/session`,
  ).as('deletedUser')

  cy.visit(`${Cypress.config().baseUrl}/en/products`)
  cy.get("[data-cy='user-menu-user-name']")
    .should('have.text', login.userName)
    .click()
  cy.get("[data-cy='menu-logout-button']").click()

  cy.waitAndAssertStatusCode('deletedUser', 204)

  cy.log(`**--- User is logged out ---**`)
  cy.url().should('include', '/login')
})

Cypress.Commands.add('logoutOrangeHrmUI', (url) => {
  cy.intercept('GET', `${url}/web/index.php/auth/logout`).as('deletedUser')

  cy.visit(url)
  cy.get('.oxd-userdropdown-tab')
    .click()
    .then((menu) => {
      cy.get("[role='menuitem']").last().should('have.text', 'Logout')
      cy.get("[role='menuitem']").last().click()
    })
  cy.waitAndAssertStatusCode('deletedUser', 302)
  cy.log(`**--- User is logged out ---**`)
  cy.url().should('include', '/login')
})
