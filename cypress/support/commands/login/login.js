Cypress.Commands.add("loginUI", (email, password, tenantID) => {
  cy.intercept("POST", "/api/tenants/login/session").as("verifyUser");

  cy.visit(`${Cypress.config().baseUrl}/en/login`);
  cy.get("[data-cy='tenant-input']").type(tenantID);
  cy.get("[data-cy='login-input']").type(email);
  cy.get("[data-cy='password-input']").type(password);
  cy.get("[data-cy='login-button']").click();
  cy.waitAndAssertStatusCode("verifyUser", 201);

  cy.log(`**--- User is logged in ---**`);
});
