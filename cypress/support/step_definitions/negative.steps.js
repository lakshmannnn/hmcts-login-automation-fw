import { When } from '@badeball/cypress-cucumber-preprocessor';
import AuthPage from '../../pages/authPage';

const authPage = new AuthPage();

// Empty username
When('I attempt to login with empty username and valid password', () => {
  const pass = 'secret_sauce';
  cy.log('Attempting login with empty username');
  authPage.attemptLogin('', pass);
});

// Null/empty password
When('I attempt to login with valid username and null password', () => {
  const user = 'standard_user';
  cy.log('Attempting login with null password');
  authPage.attemptLogin(user, '');
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
  const pass = 'secret_sauce';
  cy.log('Attempting login with international characters in username');
  authPage.attemptLogin(user, pass);
});

// Valid username invalid password
When('I attempt to login with valid username and invalid password', () => {
  const user = 'standard_user';
  const pass = 'invalidPass';
  cy.log('Attempting login with valid username and invalid password');
  authPage.attemptLogin(user, pass);
});

// Invalid username valid password
When('I attempt to login with invalid username and valid password', () => {
  const user = 'invalidUser';
  const pass = 'secret_sauce';
  cy.log('Attempting login with invalid username and valid password');
  authPage.attemptLogin(user, pass);
});

// Minimum length password
When('I attempt to login with password of minimum length', () => {
  cy.log('Attempting login with minimum password length');
  authPage.attemptLogin('standard_user', 'a');
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
  const pass = 'secret_sauce';
  cy.log('Attempting login with case sensitive characters in username');
  authPage.attemptLogin(user, pass);
});

// Leading/trailing spaces
When('I attempt to login with leading or trailing spaces in username', () => {
  const user = '    standard_user   ';
  const pass = 'secret_sauce';
  cy.log('Attempting login with leading or trailing spaces in username');
  authPage.attemptLogin(user, pass);
});
