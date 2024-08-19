const { defineConfig } = require('cypress')

module.exports = defineConfig({
  timeDelayEnabled: false,
  timeDelay: 1000,
  chromeWebSecurity: false,
  videoCompression: 0,
  defaultCommandTimeout: 20000,
  env: {
    grepFilterSpecs: true, //pre-filter specs first
    grepPrefixAt: true, // prefix tags with '@'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://cloud01-eu.testbench.com",
    excludeSpecPattern: ['**/*.txt', '**/*.md'],
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },
})
