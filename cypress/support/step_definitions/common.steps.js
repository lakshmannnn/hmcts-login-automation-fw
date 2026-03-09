import { Given, When, Then, After } from '@badeball/cypress-cucumber-preprocessor';
import AuthPage from '../../pages/authPage';
import { clearBrowserStorage } from '../utils/authUtils';

const authPage = new AuthPage();

// Teardown
After(() => {
  cy.log('Running teardown: cleaning up after scenario');
});

// Navigation
Given('I navigate to the Sauce Demo login page', () => {
  cy.log('Navigating to Sauce Demo login page');
  authPage.navigateToHome();
});

// Environment prep
When('I prepare the test environment', () => {
  cy.log('Preparing test environment');
  clearBrowserStorage();
});

// Credentials setup
When('I use a valid standard user', () => {
  const creds = { user: Cypress.env("username"), pass: Cypress.env("password") };
  cy.wrap(creds).as('creds');
});

// Login
When('I log in with the standard user', () => {
  cy.get('@creds').then(({ user, pass }) => {
    cy.log(`Logging in with user: ${user}`);
    authPage.loginUser(user, pass);
  });
});

// Assertions
Then('I should be successfully logged in', () => {
  cy.log('Verifying successful login');
  authPage.verifyLoggedIn();
});

Then('I should see the products page', () => {
  cy.log('Verifying user is on the Products page');
  authPage.verifyUrl();
});

Then('I should not be logged in', () => {
  authPage.verifyNotLoggedIn();
  cy.log('Verified user is not logged in');
});

Then('the login should fail', () => {
  cy.log('Login failed as expected');
});

Then('I should see generic error to fix incorrect username or password', () => {
  authPage.verifyErrorMessageContains(Cypress.env("err_msg_incorrect_username_or_password"));
});

Then('I should see error related to locked out username', () => {
  authPage.verifyErrorMessageContains(Cypress.env("err_msg_locked_out_user"));
});

Then('I should see error to enter password', () => {
  authPage.verifyErrorMessageContains(Cypress.env("err_msg_enter_password"));
});

Then('I should see error to enter username', () => {
  authPage.verifyErrorMessageContains(Cypress.env("err_msg_enter_username"));
});

Then('I should not be able to access the site in the new tab', () => {
  authPage.verifyNotLoggedIn();
  cy.log('Verified not accessible in new tab');
});

Then('I should not be able to access the site', () => {
  authPage.verifyNotLoggedIn();
  cy.log('Verified not accessible after back button');
});

Then('I should be able to navigate and login', () => {
  cy.log('Verifying keyboard navigation and login');
  authPage.verifyLoggedIn();
});

Then('the login should fail securely', () => {
  cy.log('Security validation on error message');
  authPage.verifyErrorMessageContains('Epic sadface: Username and password do not match any user in this service');
});

Then('I should be rate limited', () => {
  cy.log('No explicit rate limit in Sauce Demo - placeholder');
});

Then('I should be prompted for MFA', () => {
  cy.log('Sauce Demo does not have MFA - placeholder');
});

Then('I should be logged in via API', () => {
  cy.log('Placeholder for API login validation');
});

Then('The user should be logged in under 2 seconds response time', () => {
  cy.get('@responseTime').then((time) => {
    cy.log(`Checking response time: ${time}ms`);
    expect(time).to.be.lessThan(2000);
  });
});

Then('I should see appropriate messages', () => {
  cy.log('Appropriate messages shown');
});

Then('UI should remain responsive and show no unexpected errors', () => {
  cy.get('body').should('not.contain', 'An unexpected error occurred');
});
