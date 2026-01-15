import { When } from '@badeball/cypress-cucumber-preprocessor';
import AuthPage from '../../pages/authPage';

const authPage = new AuthPage();

/**
 * Attempt login with empty username
 */
When('I attempt to login with empty username and valid password', () => {
  const pass = 'someValidPass';
  cy.log('Attempting login with empty username');
  authPage.attemptLogin('', pass);
});

/**
 * Attempt login with null password
 */
When('I attempt to login with valid username and null password', () => {
  const user = 'someValidUser';
  cy.log('Attempting login with null password');
  authPage.attemptLogin(user, '');
});

/**
 * Attempt login with special chars
 */
When('I attempt to login with special characters in username', () => {
  const user = '!@#$%^&*()';
  const pass = 'validPass';
  cy.log('Attempting login with special characters in username');
  authPage.attemptLogin(user, pass);
});

/**
 * Attempt login with international chars
 */
When('I attempt to login with international characters in username', () => {
  const user = '用户名';
  const pass = 'validPass';
  cy.log('Attempting login with international characters in username');
  authPage.attemptLogin(user, pass);
});

/**
 * Attempt login with valid user invalid pass
 */
When('I attempt to login with valid username and invalid password', () => {
  const user = 'validUser';
  const pass = 'invalidPass';
  cy.log('Attempting login with valid username and invalid password');
  authPage.attemptLogin(user, pass);
});

/**
 * Attempt login with invalid user valid pass
 */
When('I attempt to login with invalid username and valid password', () => {
  const user = 'invalidUser';
  const pass = 'validPass';
  cy.log('Attempting login with invalid username and valid password');
  authPage.attemptLogin(user, pass);
});

/**
 * Attempt login with min length
 */
When('I attempt to login with password of minimum length', () => {
  cy.log('Attempting login with minimum password length');
  authPage.attemptLogin('user', 'a');
});

/**
 * Attempt login in partitions
 */
When('I attempt to login with username in different partitions', () => {
  cy.log('Testing username equivalence partitions');
  authPage.attemptLogin('valid', 'pass');
  authPage.attemptLogin('invalid@domain', 'pass');
});

/**
 * Logout and open new tab
 */
When('I logout and open a new tab', () => {
  cy.get('#logout2').click();
  cy.log('Logged out and simulating new tab by revisiting page');
  cy.visit('/index.html');
});

/**
 * Logout and back button
 */
When('I logout and use the back button', () => {
  cy.get('#logout2').click();
  cy.log('Logged out and using back button');
  cy.go('back');
});