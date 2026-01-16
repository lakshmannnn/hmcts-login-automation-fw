// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// Below custom commands can also be used to perform authentication instead of POM methods*******
// FOr now these are just placeholders.
Cypress.Commands.add('signup', (username, password) => {
  cy.get('#signin2').click();
  cy.get('#sign-username').should('be.visible').type(username);
  cy.get('#sign-password').type(password);
  cy.window().then((win) => cy.stub(win, 'alert').as('signupAlert'));
  cy.get('button[onclick="register()"]').click();
  cy.get('@signupAlert').should('have.been.called');
});

Cypress.Commands.add('login', (username, password) => {
  cy.get('#login2').click();
  cy.get('#loginusername').should('be.visible').type(username);
  cy.get('#loginpassword').type(password);
  cy.get('button[onclick="logIn()"]').click();
});