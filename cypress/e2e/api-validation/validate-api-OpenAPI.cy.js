import { validateSchema } from "cypress-ajv-schema-validator";

const schema = {
  openapi: "3.0.3",
  paths: {
    "/vehicles/{vin}/status/odometer": {
      parameters: {
        $ref: "#/components/parameters/vinParam",
      },
      get: {
        summary: "Returns the current odometer reading in both km and miles",
        operationId: "getOdometerStatus",
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    km: { type: "number" },
                    miles: { type: "number" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
const example = {
  km: 100000,
  miles: 62000,
};

const server = "https://96a24b5d-4fc2-4a52-92e0-3038c2a779c6.mock.pstmn.io";
const path = "/v1/vehicles/4Y1SL65848Z411439/status/odometer";
const endpoint = "/vehicles/{vin}/status/odometer";
const baseUrl = `${server}${path}`;
describe("API Schema Validation with OpenAPI - Custom Command", () => {
  it("Checks the user data by using a plain JSON Schema", () => {
    cy.request("GET", baseUrl)
      .validateSchema(schema, {
        endpoint: endpoint,
        method: "GET",
        status: 200,
      })
      .then((response) => {
        cy.log("**---- Checking the response ----**");
        expect(response.status).to.eq(200);
        expect(response.statusText).to.eq("OK");
        expect(response.body).to.deep.equal(example);
      });
  });
});

/*
* Let's use the validateSchema() utility function from the 
* `cypress-ajv-schema-validator` plug-in to report JSON Schema 
* validation errors in the response of a network request
* with cy.request().
*/
describe("API Schema Validation with OpenAPI - Function", () => {
  it("Checks the user data by using a plain JSON Schema", () => {
    cy.request("GET", baseUrl).then((response) => {
      const data = response.body;
      const errors = validateSchema(data, schema, {
        endpoint: endpoint,
        method: "GET",
        status: 200,
      });
      // Assertion to ensure there aren't any validation errors
      expect(errors).to.be.null;
    });
  });
});
