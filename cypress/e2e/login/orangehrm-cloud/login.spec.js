import login from '../../../fixtures/login/orangehrm-credentials.json'

describe('Regular login via the UI', () => {
  beforeEach(() => {
    cy.intercept(
      'POST',
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
    ).as('validateUser')

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

    /*
     * Let's set up a session to log in once, cache the browser context linked to the user
     * and reuse it for multiple tests. Cypress will remember your cookies
     * and local storage state from this session for reuse across tests.
     */
    cy.session(login.userName, () => {
      cy.loginOrangeHrmUI(login.userName, login.password, login.orangeHrmUrl)
      cy.waitAndAssertStatusCode('validateUser', 302)
      cy.log('**--- User is logged in ---**')
    })
  })

  it(
    'Checks a regular User can access the app (OrangeHR)',
    { tags: ['@loginUI', '@regression'] },
    () => {
      cy.visit(login.orangeHrmUrl)
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
      cy.visit(login.orangeHrmUrl)
      cy.log('**--- Log out the user (via UI) ---**')
      cy.logoutOrangeHrmUI(login.orangeHrmUrl)
    },
  )
})
