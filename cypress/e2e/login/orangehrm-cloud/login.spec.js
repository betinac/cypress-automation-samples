import login from '../../../fixtures/login/orangehrm-credentials.json'

// Get credentials from cypress.env.json file
const secretLogin = {
  username: Cypress.env('username'),
  password: Cypress.env('password'),
}

// Skipping this test as the main website is permanently down
describe('Regular login via the UI', () => {
  beforeEach(() => {
    // An uncaught exception is thrown on the app's Dashboard
    cy.on('uncaught:exception', (err, runnable) => {
      const responseError = `Cannot read properties of undefined (reading 'response')`
      const abortedError = `Request aborted`

      if (
        err.message &&
        (err.message.includes(responseError) ||
          err.message.includes(abortedError))
      ) {
        return false // Don't fail on errors originated from the app code
      }
    })
    cy.log(`**--- Log in with regular user's credentials via the UI---**`)
    cy.log(secretLogin)
    cy.loginOrangeHrmUI(
      secretLogin.username,
      secretLogin.password,
      login.orangeHrmUrl,
    )
    // Explicitly visit the main page
    cy.visit(login.orangeHrmUrl)
  })

  it(
    'Checks a regular User can access the app (OrangeHR)',
    { tags: ['@loginUI', '@regression'] },
    () => {
      cy.url().should('include', '/dashboard')

      cy.log(`**--- Verify user's name---**`)
      // We cannot use the user's name as it changes every time we log in
      // cy.get(".oxd-userdropdown-name").should('have.text', login.user)
      // Let's then assert the title (unfortunately I have to use the class name)
      cy.get('.oxd-topbar-header-title').contains('Dashboard')
    },
  )
  it(
    'Checks a regular User can log out from the app',
    { tags: ['@logoutUI', '@regression'] },
    () => {
      cy.log('**--- Log out the user (via UI) ---**')
      cy.logoutOrangeHrmUI(login.orangeHrmUrl)
    },
  )
})
