describe("Regular login via the UI", () => {
  const login = {
    emailAddress: Cypress.env("email"),
    password: Cypress.env("password"),
    userName: Cypress.env("userName"),
    tenantID: Cypress.env("tenantID"),
  };

  beforeEach(() => {
    cy.log(`**--- Log in with regular user's credentials via the UI---**`);
    cy.session(login.emailAddress, () => {
      cy.loginUI(login.emailAddress, login.password, login.tenantID);
    });
  });

  after(() => {
    cy.log("**--- Log out the user (via UI) ---**");
    cy.logoutUI();
  });
  it("Checks a regular User can access the app", () => {
    cy.visit(`${Cypress.config().baseUrl}/en/products`);
    cy.url().should("include", "/products");
    cy.log(`**--- Verify user's name---**`);
    cy.get("[data-cy='user-menu-user-name']").should(
      "have.text",
      login.userName
    );
  });
});
