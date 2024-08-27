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
  reporter: 'cypress-multi-reporters', // enable multiple reporters
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  e2e: {
    // specify user agent:
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; X11; Ubuntu; Linux x86_64; rv:129.0) Gecko/20100101 Firefox/129.0',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://cloud01-eu.testbench.com',
    excludeSpecPattern: ['**/*.txt', '**/*.md'],
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
