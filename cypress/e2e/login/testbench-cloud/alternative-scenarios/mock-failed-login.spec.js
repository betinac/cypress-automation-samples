describe("Attempt to log in via the UI while mocking the response", () => {
  const login = {
    emailAddress: Cypress.env("email"),
    password: Cypress.env("password"),
    userName: Cypress.env("userName"),
    tenantID: Cypress.env("tenantID"),
  };

  it(
    "Should display an error message even with valid credentials (mocked)",
    { tags: ["@loginAPI", "@mocked"] },
    () => {
      // Mock the login API response as being unauthorized
      cy.intercept("POST", "/api/tenants/login/session", {
        statusCode: 403,
        body: {
          failureType: "LoginFailedIncorrectData",
          message: "Incorrect workspace, login or password.",
        },
      }).as("validateUser");

      // Enter valid credentials, the user should not be logged in
      // as we have mocked the response of the intercepted API
      cy.loginUI(login.emailAddress, login.password, login.tenantID);
      cy.waitAndAssertStatusCode("validateUser", 403);

      // Validate that the error message is displayed
      cy.contains(
        "Please enter a matching set of workspace, user login and password."
      ).should("be.visible");
      // Verify that the URL has not changed
      cy.url().should("include", "/login");
    }
  );
});
