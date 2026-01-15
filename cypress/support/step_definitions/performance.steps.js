import { When } from '@badeball/cypress-cucumber-preprocessor';

/**
 * Login - Response time
 */
When('I login with existing logons', () => {
  const start = Date.now();
  cy.log('Starting rapid typing performance test');
  cy.get('#loginusername').type(Cypress.env("defaultUser"));
  cy.get('#loginpassword').type(Cypress.env("defaultPwd"));
  cy.get('button[onclick="logIn()"]').click();
  cy.get('#nameofuser').should('be.visible');
  const end = Date.now();
  cy.log(`Response time: ${end - start}ms`);
  cy.wrap(end - start).as('responseTime');
});


/**
 * Rapid type
 */
When('I rapidly type username in the username field and click Login button', () => {
  const terms = ['User1','User2','User3'];
  terms.forEach(term => {
    cy.get(Cypress.env('searchFieldLocator')).type(term).type('{enter}');
	cy.get('#loginusername').type(term);
  cy.get('button[onclick="logIn()"]').click();
    cy.wait(2000);
  });
});

