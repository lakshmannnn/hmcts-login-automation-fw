Feature: Dummy Authentication Tests
#TODO:The application under test is a basic URL, so advanced scenarios can not be simulated.
  As a user
  I want to test advanced security features
  So that I can ensure robustness

  Background:
    Given I navigate to the DemoBlaze homepage
    When I prepare the test environment

  @tobe
  Scenario: Rate limiting test
    When I attempt multiple rapid logins
    Then I should be rate limited

  @tobe
  Scenario: Account lockout test
    When I attempt login with wrong password multiple times
    Then the account should be locked

  @tobe
  Scenario: MFA test
    When I login with MFA enabled
    Then I should be prompted for MFA

  @tobe
  Scenario: Login with API
    When I login using API
    Then I should be logged in via API