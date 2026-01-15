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