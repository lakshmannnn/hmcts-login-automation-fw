const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  projectId: "o64h7m",
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    baseUrl: "https://www.saucedemo.com",
    env: {
      API_URL:"https://petstore.swagger.io/v2",
      username: "standard_user",
      username_lockedout: "locked_out_user",
      password: "secret_sauce",
      password_incorrect: "rotten_sauce",
      err_msg_incorrect_username_or_password:"Epic sadface: Username and password do not match any user in this service",
      err_msg_locked_out_user:"Epic sadface: Sorry, this user has been locked out.",
      err_msg_enter_password:"Epic sadface: Password is required",
      err_msg_enter_username:"Epic sadface: Username is required",
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    },
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1366,
    viewportHeight: 768,
    chromeWebSecurity: false,
    video: false,
    screenshotOnRunFailure: false,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  },
});
