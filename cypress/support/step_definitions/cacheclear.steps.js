import { When } from '@badeball/cypress-cucumber-preprocessor';

/**
 * Clear browser cache and storage
 */
When('I clear the browser cache and storage', () => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.log('Cleared browser cache and storage');
});

/**
 * Refresh page
 */
When('I refresh the page', () => {
  cy.log('Refreshing the page');
  cy.reload();
});