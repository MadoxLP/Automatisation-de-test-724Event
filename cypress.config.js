const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '3v2tab',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true
  },
  video: true,
  e2e: {
    baseUrl: 'http://localhost:3000',
    env : { apiUrl : 'http://localhost:8080'},
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    }
  }
});
