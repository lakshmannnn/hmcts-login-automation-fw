import { When } from '@badeball/cypress-cucumber-preprocessor';
import AuthPage from '../../pages/authPage';
const authPage = new AuthPage();

// Login - Response time
When('I login with existing logons', () => {
  const start = Date.now();
  cy.log('Enter logins to check response time');
  cy.get(authPage.loginUsername).should('be.visible');
  cy.get(authPage.loginUsername).focus().type(Cypress.env("username"));
  cy.get(authPage.loginPassword).focus().type(Cypress.env("password"));
  cy.get(authPage.loginSubmit).click();
  authPage.verifyLoggedIn();
  const end = Date.now();
  cy.log(`Response time: ${end - start}ms`);
  cy.wrap(end - start).as('responseTime');
});

// Rapid type
When('I rapidly type username in the username field and click Login button', () => {
  const terms = [
    'standard_user',
    'locked_out_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
  ];
  terms.forEach(term => {
    cy.get(authPage.loginUsername).should('be.visible');
    cy.get(authPage.loginUsername).clear().type(term);
    cy.get(authPage.loginSubmit).click();
    cy.wait(2000);
  });
});
