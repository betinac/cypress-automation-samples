/*
  Heads up! Unfortunately, the TestBench Cloud app that I used for automating 
  the login tests, has been retired from the market in August, 2024. I've 
  skipped the tests and left them as an example, but they can't be run anymore.
*/

// Get credentials from cypress.env.json file
const login = {
  password: Cypress.env('password'),
  userName: Cypress.env('userName'),
  tenantID: Cypress.env('tenantID'),
}

const errorMessage =
  'Please enter a matching set of workspace, user login and password.'

describe.skip('Invalid credentials via the UI', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/tenants/login/session').as('verifyUser')
    cy.visit(`${Cypress.config().baseUrl}/en/login`)
  })

  it(
    'Should show error messages for missing required credentials',
    { tags: '@loginUI' },
    () => {
      cy.get("[data-cy='login-button']").click()

      cy.log(`**--- Verify error message ---**`)
      cy.get('#tenant-input-error-hint').contains(
        'Team workspace name is required.',
      )

      cy.get("[data-cy='login-error']").contains('Server error occurred.')
    },
  )

  it(
    'Should show an error message for invalid tenant credentials',
    { tags: '@loginUI' },
    () => {
      cy.checkInvalidCredentials(
        login.userName,
        login.password,
        'invalid-tenantId',
        403,
      )

      cy.log(`**--- Verify error message ---**`)
      cy.get("[data-cy='login-error']").contains(errorMessage)
    },
  )

  it(
    'Should show an error message for invalid user credentials',
    { tags: ['@loginUI', '@regression'] },
    () => {
      cy.checkInvalidCredentials(
        'invalid-email',
        login.password,
        login.tenantID,
        403,
      )

      cy.log(`**--- Verify error message ---**`)
      cy.get("[data-cy='login-error']").contains(errorMessage)
    },
  )

  it(
    'Should show an error message for invalid password credentials',
    { tags: ['@loginUI', '@regression'] },
    () => {
      cy.checkInvalidCredentials(
        login.userName,
        'invalid-password',
        login.tenantID,
        403,
      )

      cy.log(`**--- Verify error message ---**`)
      cy.get("[data-cy='login-error']").contains(errorMessage)
    },
  )
})
