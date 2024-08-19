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

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Include the custom command and 'validateSchema' function globally
// https://github.com/sclavijosuero/cypress-ajv-schema-validator/blob/main/README.md
import 'cypress-ajv-schema-validator'

// load and register the grep feature
// https://github.com/bahmutov/cy-grep
const registerCypressGrep = require('@bahmutov/cy-grep')
registerCypressGrep()
