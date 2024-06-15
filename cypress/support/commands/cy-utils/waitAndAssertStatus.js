Cypress.Commands.add(
  "waitAndAssertStatusCode",
  (interceptAlias, statusCodeValue) => {
    cy.wait(`@${interceptAlias}`).then((xhr) => {
      expect(xhr.response.statusCode).to.eq(statusCodeValue);
    });
  }
);
