import { When } from '@badeball/cypress-cucumber-preprocessor';
import AuthPage from '../../pages/authPage';

const authPage = new AuthPage();

/**
 * SQL injection
 */
When('I enter a SQL injection pattern in username', () => {
  cy.log('Testing SQL injection in username');
  authPage.attemptLogin("'; DROP TABLE users; --", 'pass');
});

/**
 * XSS in password
 */
When('I enter an XSS string in password', () => {
  cy.log('Testing XSS in password');
  authPage.attemptLogin('user', '<script>alert("xss")</script>');
});