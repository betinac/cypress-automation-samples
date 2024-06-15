let EMAIL_ADDRESS;
let PASSWORD;
describe("Regular login", () => {
  beforeEach(() => {
    EMAIL_ADDRESS = Cypress.env("email");
    PASSWORD = Cypress.env("password");

    cy.session(EMAIL_ADDRESS, () => {
      cy.log(`**--- Log in with regular user's credentials ---**`);
      cy.loginUI(EMAIL_ADDRESS, PASSWORD).then((data) => {
        cy.visit(`${Cypress.config().baseUrl}/en/products`);
      });
    });
  });

  it(`Checks a regular User can access the app`, () => {
    cy.visit(`${Cypress.config().baseUrl}/en/products`);
    cy.url().should("include", "/products");
    cy.get(".mat-list-text").should("have.text", "Sample User");
  });
});
