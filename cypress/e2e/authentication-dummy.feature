Feature: Dummy Authentication Tests
  As a tester
  I want to test advanced security features
  So that I can ensure robustness

  Background:
    Given I navigate to the DemoBlaze homepage
    When I prepare the test environment

  @dummy
  Scenario: Rate limiting test
    When I attempt multiple rapid logins
    Then I should be rate limited

  @dummy
  Scenario: CSRF protection test
    When I attempt a CSRF attack on login
    Then the login should fail

  @dummy
  Scenario: Account lockout test
    When I attempt login with wrong password multiple times
    Then the account should be locked

  @dummy
  Scenario: MFA test
    When I login with MFA enabled
    Then I should be prompted for MFA

  @dummy
  Scenario: Login with API
    When I login using API
    Then I should be logged in via API