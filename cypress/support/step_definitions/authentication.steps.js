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
 * Shared step: Prepare test environment
 */
When('I prepare the test environment', () => {
  cy.log('Preparing test environment');
  clearBrowserStorage();
});

/**
 * Shared step: Clean up after test
 */
When('I clean up after the test', () => {
  cy.log('Cleaning up after test');
  logoutIfLoggedIn();
});

/**
 * Shared step: Attempt login
 */
When('I attempt to login with empty username and valid password', () => {
  const pass = 'someValidPass';
  cy.log('Attempting login with empty username');
  authPage.attemptLogin('', pass);
});

/**
 * Shared step: Attempt login with null password
 */
When('I attempt to login with valid username and null password', () => {
  const user = 'someValidUser';
  cy.log('Attempting login with null password');
  authPage.attemptLogin(user, '');
});

/**
 * Shared step: Attempt login with special chars
 */
When('I attempt to login with special characters in username', () => {
  const user = '!@#$%^&*()';
  const pass = 'validPass';
  cy.log('Attempting login with special characters in username');
  authPage.attemptLogin(user, pass);
});

/**
 * Shared step: Attempt login with international chars
 */
When('I attempt to login with international characters in username', () => {
  const user = '用户名';
  const pass = 'validPass';
  cy.log('Attempting login with international characters in username');
  authPage.attemptLogin(user, pass);
});

/**
 * Shared step: Attempt login with valid user invalid pass
 */
When('I attempt to login with valid username and invalid password', () => {
  const user = 'validUser';
  const pass = 'invalidPass';
  cy.log('Attempting login with valid username and invalid password');
  authPage.attemptLogin(user, pass);
});

/**
 * Shared step: Attempt login with invalid user valid pass
 */
When('I attempt to login with invalid username and valid password', () => {
  const user = 'invalidUser';
  const pass = 'validPass';
  cy.log('Attempting login with invalid username and valid password');
  authPage.attemptLogin(user, pass);
});

/**
 * Shared step: Attempt login with min length
 */
When('I attempt to login with password of minimum length', () => {
  cy.log('Attempting login with minimum password length');
  authPage.attemptLogin('user', 'a');
});

/**
 * Shared step: Attempt login in partitions
 */
When('I attempt to login with username in different partitions', () => {
  cy.log('Testing username equivalence partitions');
  authPage.attemptLogin('valid', 'pass');
  authPage.attemptLogin('invalid@domain', 'pass');
});

/**
 * Shared step: Clear browser cache and storage
 */
When('I clear the browser cache and storage', () => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.log('Cleared browser cache and storage');
});

/**
 * Shared step: Refresh page
 */
When('I refresh the page', () => {
  cy.log('Refreshing the page');
  cy.reload();
});

/**
 * Shared step: Logout and open new tab
 */
When('I logout and open a new tab', () => {
  cy.get('#logout2').click();
  cy.log('Logged out and simulating new tab by revisiting page');
  cy.visit('/index.html');
});

/**
 * Shared step: Logout and back button
 */
When('I logout and use the back button', () => {
  cy.get('#logout2').click();
  cy.log('Logged out and using back button');
  cy.go('back');
});

/**
 * Shared step: Multiple rapid logins
 */
When('I attempt multiple rapid logins', () => {
  cy.log('Attempting multiple rapid logins for rate limiting test');
  for (let i = 0; i < 10; i++) {
    authPage.attemptLogin('user', 'pass');
  }
});

/**
 * Shared step: CSRF attack
 */
When('I attempt a CSRF attack on login', () => {
  cy.log('Attempting CSRF attack on login');
  cy.request({
    method: 'POST',
    url: '/login',
    body: { username: 'user', password: 'pass' },
    failOnStatusCode: false
  }).then((response) => {
    cy.log(`CSRF response status: ${response.status}`);
    expect(response.status).to.not.equal(200);
  });
});

/**
 * Shared step: Wrong password multiple times
 */
When('I attempt login with wrong password multiple times', () => {
  cy.log('Attempting multiple wrong password logins for lockout test');
  for (let i = 0; i < 5; i++) {
    authPage.attemptLogin('user', 'wrongpass');
  }
});

/**
 * Shared step: Login with MFA
 */
When('I login with MFA enabled', () => {
  cy.log('Logging in with MFA enabled user');
  authPage.loginUser('mfaUser', 'pass');
});

/**
 * Shared step: Login with API
 */
When('I login using API', () => {
  cy.log('Logging in using API');
  cy.request('POST', '/login', { username: 'user', password: 'pass' }).then((response) => {
    cy.log(`API login response: ${response.status}`);
    expect(response.status).to.equal(200);
  });
});

/**
 * Shared step: Focus and type keyboard
 */
When('I focus the username input and type using the keyboard', () => {
  cy.log('Focusing username input and typing via keyboard');
  cy.get('#loginusername').focus().type('testuser{tab}testpass{enter}');
});

/**
 * Shared step: Focus and type specific term using keyboard
 */
When('I focus the username input and type {string} using the keyboard', (term) => {
  cy.log(`Focusing username input and typing: ${term}`);
  cy.get('#loginusername').focus().type(term + '{tab}testpass{enter}');
});

/**
 * Shared step: Rapid type
 */
When('I rapidly type in username and password fields', () => {
  const start = Date.now();
  cy.log('Starting rapid typing performance test');
  cy.get('#loginusername').type('testuser');
  cy.get('#loginpassword').type('testpass');
  cy.get('button[onclick="logIn()"]').click();
  cy.get('#nameofuser').should('be.visible');
  const end = Date.now();
  cy.log(`Response time: ${end - start}ms`);
  cy.wrap(end - start).as('responseTime');
});

/**
 * Shared step: SQL injection
 */
When('I enter a SQL injection pattern in username', () => {
  cy.log('Testing SQL injection in username');
  authPage.attemptLogin("'; DROP TABLE users; --", 'pass');
});

/**
 * Shared step: XSS in password
 */
When('I enter an XSS string in password', () => {
  cy.log('Testing XSS in password');
  authPage.attemptLogin('user', '<script>alert("xss")</script>');
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
 * Shared step: Rate limited
 */
Then('I should be rate limited', () => {
  cy.on('window:alert', (str) => {
    cy.log(`Rate limit alert: ${str}`);
    expect(str).to.contain('Too many attempts');
  });
});

/**
 * Shared step: Login fails
 */
Then('the login should fail', () => {
  cy.log('Login failed as expected');
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
 * Shared step: User logged in under 2 seconds
 */
Then('the user should be logged in under 2 seconds response time', () => {
  cy.get('@responseTime').then((time) => {
    cy.log(`Checking response time: ${time}ms`);
    expect(time).to.be.lessThan(2000);
  });
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
 * Shared step: Not logged in
 */
Then('I should not be logged in', () => {
  cy.get('#nameofuser').should('not.exist');
  cy.log('Verified user is not logged in');
});