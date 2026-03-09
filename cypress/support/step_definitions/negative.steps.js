import { When } from '@badeball/cypress-cucumber-preprocessor';
import AuthPage from '../../pages/authPage';

const authPage = new AuthPage();

// Empty username
When('I attempt to login with empty username and valid password', () => {
  // const pass = Cypress.env("password");
  cy.log('Attempting login with empty username');
  authPage.attemptLogin(' ', Cypress.env("password"));
});

// only username
When('I attempt to login with only username but no password', () => {
  cy.log('Attempting login with empty username');
  authPage.attemptLoginOnlyUsername(Cypress.env("username"));
});


// Null/empty password
When('I attempt to login with valid username and empty password', () => {
  // const user = Cypress.env("username");
  cy.log('Attempting Login with only username');
  authPage.attemptLogin(Cypress.env("username"), ' ');
});

// only password
When('I attempt to login with only password but no username', () => {
  cy.log('Attempting login with only password');
  authPage.attemptLoginOnlyPasssword(Cypress.env("password"));
});

// Special characters in username
When('I attempt to login with special characters in username', () => {
  const user = '!@#$%^&*()';
  const pass = 'secret_sauce';
  cy.log('Attempting login with special characters in username');
  authPage.attemptLogin(user, pass);
});

// International characters
When('I attempt to login with international characters in username', () => {
  const user = '用户名';
  const pass = Cypress.env("password");
  cy.log('Attempting login with international characters in username');
  authPage.attemptLogin(user, pass);
});

// Valid username invalid password
When('I attempt to login with valid username and invalid password', () => {
  const user = Cypress.env("username");
  const pass = Cypress.env("password_incorrect");
  cy.log('Attempting login with valid username and invalid password');
  authPage.attemptLogin(user, pass);
});

// Invalid username valid password
When('I attempt to login with invalid username and valid password', () => {
  const user = 'invalidUser';
  const pass = Cypress.env("password");
  cy.log('Attempting login with invalid username and valid password');
  authPage.attemptLogin(user, pass);
});

// Minimum length password
When('I attempt to login with password of minimum length', () => {
  cy.log('Attempting login with minimum password length');
  authPage.attemptLogin(Cypress.env("username"), 'a');
});

// Partitions
When('I attempt to login with username in different partitions', () => {
  cy.log('Testing username equivalence partitions');
  authPage.attemptLogin('valid', 'pass');
  authPage.attemptLogin('invalid@domain', 'pass');
});

// Case sensitivity
When('I attempt to login with case sensitive characters in username', () => {
  const user = 'STandard_User';
  const pass = Cypress.env("password");
  cy.log('Attempting login with case sensitive characters in username');
  authPage.attemptLogin(user, pass);
});

// Leading/trailing spaces
When('I attempt to login with leading or trailing spaces in username', () => {
  const user = '    standard_user   ';
  const pass = Cypress.env("password");
  cy.log('Attempting login with leading or trailing spaces in username');
  authPage.attemptLogin(user, pass);
});

/**
 * Using locked out user for login
 */
When('I attempt login with locked out user', () => {
  cy.log('Attempting logins with lockedout user');
    authPage.attemptLogin(Cypress.env("username_lockedout"), Cypress.env("password"));
});