import login from "../../../fixtures/login/orangehrm-credentials.json";
describe("Regular login via the UI", () => {
  beforeEach(() => {
    cy.intercept(
      "POST",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate"
    ).as("validateUser");
    cy.log(`**--- Log in with regular user's credentials via the UI---**`);

    // Let's cache the browser context linked to the user
    // and reuse it for multiple tests
    cy.session(login.userName, () => {
      cy.loginOrangeHrmUI(login.userName, login.password, login.orangeHrmUrl);
      cy.waitAndAssertStatusCode("validateUser", 302);
      cy.log(`**--- User is logged in ---**`);
    });
  });

  after(() => {
    cy.log("**--- Log out the user (via UI) ---**");
    cy.logoutOrangeHrmUI(login.orangeHrmUrl);
  });

  it(
    "Checks a regular User can access the app (OrangeHR)",
    { tags: ["@loginUI", "@regression"] },
    () => {
      // An uncaught exception is thrown on the Dashboard
      cy.on("uncaught:exception", (err, runnable) => {
        expect(err.message).to.include(
          `Cannot read properties of undefined (reading 'response'`
        );
        return false;
      });

      cy.visit(login.orangeHrmUrl);
      cy.url().should("include", "/dashboard");
      cy.log(`**--- Verify user's name---**`);

      // We cannot use the user's name as it changes everytime we log in
      // cy.get(".oxd-userdropdown-name").should('have.text', login.user)
      // Let's check for the title
      cy.get(".oxd-topbar-header-title").contains("Dashboard");
    }
  );
});
