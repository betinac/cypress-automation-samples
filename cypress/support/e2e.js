// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import addContext from 'mochawesome/addContext'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Include the custom command and 'validateSchema' function globally
// https://github.com/sclavijosuero/cypress-ajv-schema-validator/blob/main/README.md
import 'cypress-ajv-schema-validator'

// load and register the grep feature
// https://github.com/bahmutov/cy-grep
const registerCypressGrep = require('@bahmutov/cy-grep')
registerCypressGrep()

before(() => {
  // Clear up all sessions, even if we re-run the spec
  cy.log('close all sessions')
  Cypress.session.clearAllSavedSessions()
})

Cypress.on('test:after:run', (test, runnable) => {
  // Add videos and screenshots ONLY if the test failed
  if (test.state === 'failed') {
    /*
     * Adding videos to the Mochawesome report
     */
    let videoName = Cypress.spec.relative
    // Trim the beginning portion 'cypress/e2e/'
    videoName = videoName.replace(/^cypress\/e2e\//, '')
    videoName = videoName.replace('/.js.*', '.js')
    const videoUrl = 'videos/' + videoName + '.mp4'
    addContext({ test }, videoUrl)

    /*
     * Adding screenshots to the Mochawesome report
     */
    let item = runnable
    const nameParts = [runnable.title]
    // Iterate through all parents and grab the titles
    while (item.parent) {
      nameParts.unshift(item.parent.title)
      item = item.parent
    }
    // this is how cypress joins the test title fragments
    const fullTestName = nameParts.filter(Boolean).join(' -- ')
    let screenshotName = Cypress.spec.relative
    // Trim the beginning portion 'cypress/e2e/'
    screenshotName = screenshotName.replace(/^cypress\/e2e\//, '')
    const imageUrl = `screenshots/${screenshotName}/${fullTestName} (failed).png`

    addContext({ test }, imageUrl)
  }
})
