import { When } from '@badeball/cypress-cucumber-preprocessor';
import AuthPage from '../../pages/authPage';

const authPage = new AuthPage();

// SQL injection
When('I enter a SQL injection pattern in username', () => {
  cy.log('Testing SQL injection in username');
  authPage.attemptLogin("'; DROP TABLE users; --", 'pass');
});

// XSS in password
When('I enter an XSS string in password', () => {
  cy.log('Testing XSS in password');
  authPage.attemptLogin('user', '<script>alert("xss")</script>');
});

// Clear browser cache and storage
When('I clear the browser cache and storage', () => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.log('Cleared browser cache and storage');
});

// Refresh page
When('I refresh the page', () => {
  cy.log('Refreshing the page');
  cy.reload();
});

// CSRF attack (placeholder; external domain and CORS constraints prevent direct post)
When('I attempt a CSRF attack on login', () => {
  cy.log('Attempting CSRF attack on login - placeholder validation');
});
