/**
 * Utility functions for authentication tests
 */

/**
 * Generates a unique user credentials object
 * @returns {Object} - { user, pass }
 */
export function generateUniqueUser() {
  const timestamp = Date.now();
  const user = `testuser_${timestamp}`;
  const pass = `SecurePass_${timestamp}!`;
  return { user, pass };
}

/**
 * Clears browser storage and cookies
 */
export function clearBrowserStorage() {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.log('Browser storage and cookies cleared');
}

/**
 * Logs out the user if currently logged in
 */
export function logoutIfLoggedIn() {
  cy.get('body').then($body => {
    const $logout = $body.find('#logout2');

    // Element exists and is hidden (display: none)
    if ($logout.length > 0 && !$logout.is(':visible')) {
      cy.wrap($logout).click({ force: true });
      cy.log('User logged out');
    }
  });
}
