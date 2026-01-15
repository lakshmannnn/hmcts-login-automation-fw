import { When } from '@badeball/cypress-cucumber-preprocessor';
import AuthPage from '../../pages/authPage';

const authPage = new AuthPage();

/**
 * Multiple rapid logins
 */
When('I attempt multiple rapid logins', () => {
  cy.log('Attempting multiple rapid logins for rate limiting test');
  for (let i = 0; i < 10; i++) {
    authPage.attemptLogin('user', 'pass');
  }
});

/**
 * Wrong password multiple times
 */
When('I attempt login with wrong password multiple times', () => {
  cy.log('Attempting multiple wrong password logins for lockout test');
  for (let i = 0; i < 5; i++) {
    authPage.attemptLogin('user', 'wrongpass');
  }
});

/**
 * Login with MFA
 */
When('I login with MFA enabled', () => {
  cy.log('Logging in with MFA enabled user');
  authPage.loginUser('mfaUser', 'pass');
});

/**
 * Login with API
 */
When('I login using API', () => {
  cy.log('Logging in using API');
  cy.request('POST', '/login', { username: 'user', password: 'pass' }).then((response) => {
    cy.log(`API login response: ${response.status}`);
    expect(response.status).to.equal(200);
  });
});