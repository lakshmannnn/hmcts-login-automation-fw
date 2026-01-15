import { When } from '@badeball/cypress-cucumber-preprocessor';
import AuthPage from '../../pages/authPage';

const authPage = new AuthPage();

/**
 * Focus and type keyboard
 */
When('I focus the username input and type using the keyboard', () => {
  cy.get('#signInModal').should('not.be.visible');
  cy.get('#login2').click();
  cy.get('#loginusername').should('be.visible');
  cy.log('Focusing username input and typing via keyboard');
  cy.get('#loginusername').focus().type('luck123');
  cy.log('Focusing password input and typing via keyboard then click on Login button');
  cy.get('#loginpassword').focus().type('luck123');
  cy.get('button[onclick="logIn()"]').type('{enter}');
});

/**
 * Focus and type specific term using keyboard
 */
When('I focus the username input and type {string} using the keyboard', (term) => {
  cy.get('#signInModal').should('not.be.visible');
  cy.get('#login2').click();
  cy.get('#loginusername').should('be.visible');
  cy.log(`Focusing username input and typing: ${term}`);
  cy.get('#loginusername').focus().type(term);
  cy.get('#loginpassword').focus().type('testpass');
  cy.get('button[onclick="logIn()"]').click();
});