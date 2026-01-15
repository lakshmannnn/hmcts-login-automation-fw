import { When } from '@badeball/cypress-cucumber-preprocessor';

/**
 * Rapid type
 */
When('I rapidly type in username and password fields', () => {
  const start = Date.now();
  cy.log('Starting rapid typing performance test');
  cy.get('#loginusername').type('Cypress.env("defaultUser")');
  cy.get('#loginpassword').type('Cypress.env("defaultPwd")');
  cy.get('button[onclick="logIn()"]').click();
  cy.get('#nameofuser').should('be.visible');
  const end = Date.now();
  cy.log(`Response time: ${end - start}ms`);
  cy.wrap(end - start).as('responseTime');
});