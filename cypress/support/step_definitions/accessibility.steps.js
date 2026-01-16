import { When } from '@badeball/cypress-cucumber-preprocessor';
import AuthPage from '../../pages/authPage';

const authPage = new AuthPage();

/**
 * Focus and type keyboard
 */
When('I focus the username and password inputs and type using the keyboard', () => {
  cy.get('#signInModal').should('not.be.visible');
  cy.get(authPage.loginBtn).click();
  cy.get(authPage.loginUsername).should('be.visible');
  cy.log('Focusing username input and typing via keyboard');
  cy.get(authPage.loginUsername).focus().type('luck123');
  cy.log('Focusing password input and typing via keyboard then submit');
  cy.get(authPage.loginPassword).focus().type('luck123');
  cy.get(authPage.loginSubmit).click();
});

/**
 * Focus and type specific term using keyboard
 */
When('I focus the username input and type {string} using the keyboard', (term) => {
  cy.get('#signInModal').should('not.be.visible');
  cy.get(authPage.loginBtn).click();
  cy.get(authPage.loginUsername).should('be.visible');
  cy.log(`Focusing username input and typing: ${term}`);
  cy.get(authPage.loginUsername).focus().type(term);
  cy.get(authPage.loginPassword).focus().type('testpass');
  cy.get(authPage.loginSubmit).click();
});
