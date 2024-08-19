import { validateSchema } from 'cypress-ajv-schema-validator'
// OpenAPI schema doc as a fixture file
import schema from '../../fixtures/schemas/openapi-schema.json'

const example = {
  km: 100000,
  miles: 62000,
}

const server = 'https://96a24b5d-4fc2-4a52-92e0-3038c2a779c6.mock.pstmn.io'
const path = '/v1/vehicles/4Y1SL65848Z411439/status/odometer'
const endpoint = '/vehicles/{vin}/status/odometer'
const baseUrl = `${server}${path}`
describe('API Schema Validation with OpenAPI - Custom Command', () => {
  it(
    'Checks the user data by using an OpenAPI JSON Schema',
    { tags: ['@contract', '@regression'] },
    () => {
      cy.request('GET', baseUrl)
        .validateSchema(schema, {
          endpoint: endpoint,
          method: 'GET',
          status: 200,
        })
        .then((response) => {
          cy.log('**---- Checking the response ----**')
          expect(response.status).to.eq(200)
          expect(response.statusText).to.eq('OK')
          expect(response.body).to.deep.equal(example)
        })
    },
  )
})

/*
 * Let's use the validateSchema() utility function from the
 * `cypress-ajv-schema-validator` plug-in to report JSON Schema
 * validation errors in the response of a network request
 * with cy.request().
 */
describe('API Schema Validation with OpenAPI - Function', () => {
  it(
    'Checks the user data by using an OpenAPI JSON Schema',
    { tags: 'contract' },
    () => {
      cy.request('GET', baseUrl).then((response) => {
        const data = response.body
        const errors = validateSchema(data, schema, {
          endpoint: endpoint,
          method: 'GET',
          status: 200,
        })
        // Assertion to ensure there aren't any validation errors
        expect(errors).to.be.null
      })
    },
  )
})
