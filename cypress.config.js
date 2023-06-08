const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  screenshotOnRunFailure: true,
  videoCompression: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 10000,
  requestTimeout: 10000,
  retries: 1,
  numTestsKeptInMemory: 2,
  modifyObstructiveCode: false,
  scrollBehavior: false,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "cypress-mochawesome-reporter",
    overwrite: true,
    html: false,
    json: true,
    charts: true,
    reportPageTitle: "My Test Suite",
    embeddedScreenshots: true,
    inlineAssets: true,
    reportDir: "cypress/TestReport",
    saveAllAttempts: true
  },
  screenshotsFolder: "cypress/TestReport/screenshots",
  videosFolder: "cypress/TestReport/videos",
  video: true,
  e2e: {
    baseUrl: "http://localhost:8080",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
