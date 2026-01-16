import { When } from '@badeball/cypress-cucumber-preprocessor';
import AuthPage from '../../pages/authPage';
const authPage = new AuthPage();

/**
 * Login - Response time
 */
When('I login with existing logons', () => {
  const start = Date.now();
  cy.log('Enter logins to check response time');
  cy.get('#signInModal').should('not.be.visible');
  cy.get(authPage.loginBtn).click();
  cy.get(authPage.loginUsername).should('be.visible');
  cy.get(authPage.loginUsername).focus().type(Cypress.env("defaultUser"));
  cy.get(authPage.loginPassword).focus().type(Cypress.env("defaultPwd"));
  cy.get(authPage.loginSubmit).click();
  cy.get('#nameofuser').should('be.visible');
  const end = Date.now();
  cy.log(`Response time: ${end - start}ms`);
  cy.wrap(end - start).as('responseTime');
});


/**
 * Rapid type
 */
When('I rapidly type username in the username field and click Login button', () => {
  const terms = ['User1'];
  terms.forEach(term => {
    cy.get('#signInModal').should('not.be.visible');
    cy.get(authPage.loginBtn).click();
    cy.get(authPage.loginUsername).should('be.visible');
    cy.get(authPage.loginUsername).type(term);
    cy.get(authPage.loginSubmit).click();
    cy.wait(2000);
  });
});

