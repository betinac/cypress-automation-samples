Cypress.Commands.add('loginUI', (email, password, tenantID) => {
  cy.visit(`${Cypress.config().baseUrl}/en/login`)
  cy.get("[data-cy='tenant-input']").type(tenantID, { delay: 0 })
  cy.get("[data-cy='login-input']").type(email, { log: false, delay: 0 })
  cy.get("[data-cy='password-input']").type(password, { log: false, delay: 0 })
  cy.get("[data-cy='login-button']").click()
})

Cypress.Commands.add('loginOrangeHrmUI', (username, password, url) => {
  cy.visit(url)
  cy.get("[name='username']").type(username, { log: false })
  cy.get("[type='password']").type(password, { log: false })
  cy.get("[type='submit']").click()
})
