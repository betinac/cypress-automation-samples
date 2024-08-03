// Plain JSON schema doc as a fixture file
import schema from '../../fixtures/schemas/plain-json-schema.json'

const example = {
  km: 100000,
  miles: 62000,
};

const server = "https://96a24b5d-4fc2-4a52-92e0-3038c2a779c6.mock.pstmn.io";
const path = "/v1/vehicles/4Y1SL65848Z411439/status/odometer"
const baseUrl = `${server}${path}`;

/*
* Let's use the cy.validateSchema() custom command from the 
* `cypress-ajv-schema-validator` plug-in, to report JSON Schema 
* validation errors in the response of a network request
* with cy.request().
*/
describe("API Schema Validation with Plain JSON", () => {
  it("Checks the user data by using a plain JSON Schema", () => {
    cy.request("GET", baseUrl)
      .validateSchema(schema)
      .then((response) => {
        cy.log("**---- Checking the response ----**");
        expect(response.status).to.eq(200);
        expect(response.statusText).to.eq("OK");
        expect(response.body).to.deep.equal(example);
      });
  });
});
