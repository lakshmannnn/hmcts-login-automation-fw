Feature: Security Authentication Tests
  As a tester
  I want to test security vulnerabilities
  So that I can ensure safe login

  Background:
    Given I navigate to the DemoBlaze homepage
    When I prepare the test environment

  @security
  Scenario: SQL injection in username
    When I enter a SQL injection pattern in username
    Then the login should fail securely

  @security
  Scenario: XSS in password
    When I enter an XSS string in password
    Then the login should fail securely

  @security
  Scenario: Verify login status after cache deletion
    When I register a new unique user
    And I log in with the registered user
    Then I should be successfully logged in
    When I clear the browser cache and storage
    And I refresh the page
    Then I should not be logged in

  @security
  Scenario: CSRF protection test
    When I attempt a CSRF attack on login
    Then the login should fail