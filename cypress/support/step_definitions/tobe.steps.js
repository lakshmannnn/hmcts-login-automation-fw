import { When } from '@badeball/cypress-cucumber-preprocessor';
import AuthPage from '../../pages/authPage';

const authPage = new AuthPage();

/**
 * Multiple rapid logins
 */
When('I attempt multiple rapid logins', () => {
  cy.log('Attempting multiple rapid logins for rate limiting test');
  for (let i = 0; i < 10; i++) {
    authPage.attemptLogin(Cypress.env("username_lockedout"), Cypress.env("password"));
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
  // cy.request('POST', '/login', { username: 'user', password: 'pass' }).then((response) => {
  //   cy.log(`API login response: ${response.status}`);
  //   expect(response.status).to.equal(200);
  // });

  cy.request({
    method: 'POST',
    url: '/',
    form: true,
    body: {
      username: Cypress.env("username"),
      password: Cypress.env("password")
    },
    followRedirect: true,
    failOnStatusCode: false
  }).then((response) => {
    cy.log('Status:', response.status);
    cy.log('Redirects?:', response.redirectedToUrl);

    if (response.status === 200 || response.redirectedToUrl?.includes('/inventory')) {
      // Proceed
      cy.visit('/inventory.html');
    } else {
      throw new Error(`Login failed: ${response.status} - try UI login instead`);
    }
  });

});