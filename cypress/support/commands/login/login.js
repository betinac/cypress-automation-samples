Cypress.Commands.add("loginUI", (email, password, tenantID) => {
  cy.visit(`${Cypress.config().baseUrl}/en/login`);
  cy.get("[data-cy='tenant-input']").type(tenantID);
  cy.get("[data-cy='login-input']").type(email, { log: false });
  cy.get("[data-cy='password-input']").type(password, { log: false });
  cy.get("[data-cy='login-button']").click();
});
