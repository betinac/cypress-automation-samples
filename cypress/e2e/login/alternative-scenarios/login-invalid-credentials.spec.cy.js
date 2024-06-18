const login = {
  password: Cypress.env("password"),
  userName: Cypress.env("userName"),
  tenantID: Cypress.env("tenantID"),
};

describe("Invalid credentials via the UI", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/tenants/login/session").as("verifyUser");
    cy.visit(`${Cypress.config().baseUrl}/en/login`);
  });

  it("Should show error messages for missing required credentials", () => {
    cy.get("[data-cy='login-button']").click();
    cy.waitAndAssertStatusCode("verifyUser", 400);

    cy.log(`**--- Verify error message ---**`);
    cy.get("#tenant-input-error-hint").contains(
      "Team workspace name is required."
    );

    cy.get("[data-cy='login-error']").contains("Server error occurred.");
  });

  it("Should show an error message for invalid tenant credentials", () => {
    cy.loginUI(login.userName, login.password, "invalid-tenantId");
    cy.waitAndAssertStatusCode("verifyUser", 403);

    cy.log(`**--- Verify error message ---**`);
    cy.get("[data-cy='login-error']").contains(
      "Please enter a matching set of workspace, user login and password."
    );
  });

  it("Should show an error message for invalid user credentials", () => {
    cy.loginUI("invalid-email", login.password, login.tenantID);
    cy.waitAndAssertStatusCode("verifyUser", 403);

    cy.log(`**--- Verify error message ---**`);
    cy.get("[data-cy='login-error']").contains(
      "Please enter a matching set of workspace, user login and password."
    );
  });

  it("Should show an error message for invalid password credentials", () => {
    cy.loginUI(login.userName, "invalid-password", login.tenantID);
    cy.waitAndAssertStatusCode("verifyUser", 403);

    cy.log(`**--- Verify error message ---**`);
    cy.get("[data-cy='login-error']").contains(
      "Please enter a matching set of workspace, user login and password."
    );
  });
});
