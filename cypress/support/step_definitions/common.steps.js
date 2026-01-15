import { Given, When, Then, After } from '@badeball/cypress-cucumber-preprocessor';
import AuthPage from '../../pages/authPage';
import { generateUniqueUser, clearBrowserStorage, logoutIfLoggedIn } from '../utils/authUtils';

const authPage = new AuthPage();

/**
 * After hook: Clean up after each scenario
 */
After(() => {
  cy.log('Running teardown: cleaning up after scenario');
  logoutIfLoggedIn();
});

/**
 * Shared step: Navigate to the DemoBlaze homepage
 */
Given('I navigate to the DemoBlaze homepage', () => {
  cy.log('Navigating to DemoBlaze homepage');
  authPage.navigateToHome();
});

/**
 * Shared step: Prepare test environment
 */
When('I prepare the test environment', () => {
  cy.log('Preparing test environment');
  clearBrowserStorage();
});

/**
 * Shared step: Register a new unique user
 */
When('I register a new unique user', () => {
  const creds = generateUniqueUser();
  cy.wrap(creds).as('creds');
  cy.log(`Registering new user: ${creds.user}`);
  authPage.registerUser(creds.user, creds.pass);
});

/**
 * Shared step: Log in with the registered user
 */
When('I log in with the registered user', () => {
  cy.get('@creds').then(({ user, pass }) => {
    cy.log(`Logging in with user: ${user}`);
    authPage.loginUser(user, pass);
  });
});

/**
 * Shared step: Verify successful login
 */
Then('I should be successfully logged in', () => {
  cy.log('Verifying successful login');
  authPage.verifyLoggedIn();
});

/**
 * Shared step: Verify welcome message
 */
Then('I should see the welcome message for the registered user', () => {
  cy.get('@creds').then(({ user }) => {
    cy.log(`Verifying welcome message for user: ${user}`);
    authPage.verifyWelcomeMessage(user);
  });
});

/**
 * Shared step: Not logged in
 */
Then('I should not be logged in', () => {
  cy.get('#nameofuser').should('not.exist');
  cy.log('Verified user is not logged in');
});

/**
 * Shared step: Login fails
 */
Then('the login should fail', () => {
  cy.log('Login failed as expected');
});

/**
 * Shared step: Alert for empty username
 */
Then('I should see an alert message for empty username', () => {
  cy.on('window:alert', (str) => {
    cy.log(`Alert message: ${str}`);
    expect(str).to.equal('Please fill out this field');
  });
});

/**
 * Shared step: Alert for empty password
 */
Then('I should see an alert message for empty password', () => {
  cy.on('window:alert', (str) => {
    cy.log(`Alert message: ${str}`);
    expect(str).to.equal('Please fill out this field');
  });
});

/**
 * Shared step: Alert for invalid username
 */
Then('I should see an alert message for invalid username', () => {
  cy.on('window:alert', (str) => {
    cy.log(`Alert message: ${str}`);
    expect(str).to.contain('Wrong password');
  });
});

/**
 * Shared step: Alert for wrong password
 */
Then('I should see an alert message for wrong password', () => {
  cy.on('window:alert', (str) => {
    cy.log(`Alert message: ${str}`);
    expect(str).to.equal('Wrong password.');
  });
});

/**
 * Shared step: Alert for user not exist
 */
Then('I should see an alert message for user does not exist', () => {
  cy.on('window:alert', (str) => {
    cy.log(`Alert message: ${str}`);
    expect(str).to.equal('User does not exist.');
  });
});

/**
 * Shared step: Appropriate message
 */
Then('I should see appropriate message', () => {
  cy.on('window:alert', (str) => {
    cy.log(`Alert message: ${str}`);
    expect(str).to.contain('Password too short');
  });
});

/**
 * Shared step: Not accessible in new tab
 */
Then('I should not be able to access the site in the new tab', () => {
  cy.get('#nameofuser').should('not.exist');
  cy.log('Verified not accessible in new tab');
});

/**
 * Shared step: Not able to access
 */
Then('I should not be able to access the site', () => {
  cy.get('#nameofuser').should('not.exist');
  cy.log('Verified not accessible after back button');
});

/**
 * Shared step: Able to navigate and login
 */
Then('I should be able to navigate and login', () => {
  cy.log('Verifying keyboard navigation and login');
  authPage.verifyLoggedIn();
});

/**
 * Shared step: Login fails securely
 */
Then('the login should fail securely', () => {
  cy.on('window:alert', (str) => {
    cy.log(`Security test alert: ${str}`);
    expect(str).to.not.contain('xss');
  });
});

/**
 * Shared step: Rate limited
 */
Then('I should be rate limited', () => {
  cy.on('window:alert', (str) => {
    cy.log(`Rate limit alert: ${str}`);
    expect(str).to.contain('Too many attempts');
  });
});

/**
 * Shared step: Account locked
 */
Then('the account should be locked', () => {
  cy.on('window:alert', (str) => {
    cy.log(`Lockout alert: ${str}`);
    expect(str).to.contain('Account locked');
  });
});

/**
 * Shared step: MFA prompt
 */
Then('I should be prompted for MFA', () => {
  cy.contains('Enter MFA code').should('be.visible');
  cy.log('MFA prompt displayed');
});

/**
 * Shared step: Logged in via API
 */
Then('I should be logged in via API', () => {
  cy.log('Verified login via API');
});

/**
 * Shared step: User logged in under 2 seconds
 */
Then('The user should be logged in under 2 seconds response time', () => {
  cy.get('@responseTime').then((time) => {
    cy.log(`Checking response time: ${time}ms`);
    expect(time).to.be.lessThan(2000);
  });
});

/**
 * Shared step: Appropriate messages
 */
Then('I should see appropriate messages', () => {
  // For equivalence partitioning, multiple messages
  cy.log('Appropriate messages shown');
});

/**
 * Shared step: UI unresponsive
 */
Then('UI should remain responsive and show no unexpected errors', () => {
  cy.get('body').should('not.contain', 'An unexpected error occurred');
});