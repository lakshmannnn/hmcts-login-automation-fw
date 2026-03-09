Feature: Negative Authentication Tests (Sauce Demo)
  As a tester
  I want to test invalid login scenarios
  So that I can ensure proper error handling

  Background:
    Given I navigate to the Sauce Demo login page
    When I prepare the test environment

  @negative
  Scenario: Login with empty username
    When I attempt to login with empty username and valid password
    Then I should see an error for required username

  @negative
  Scenario: Login with null password
    When I attempt to login with valid username and null password
    Then I should see an error for required password

  @negative
  Scenario: Login with special characters in username
    When I attempt to login with special characters in username
    Then I should see an error for invalid credentials

  @negative
  Scenario: Login with international characters in username
    When I attempt to login with international characters in username
    Then I should see an error for invalid credentials

  @negative
  Scenario: Login with valid username and invalid password
    When I attempt to login with valid username and invalid password
    Then I should see an error for invalid credentials

  @negative
  Scenario: Login with invalid username and valid password
    When I attempt to login with invalid username and valid password
    Then I should see an error for invalid credentials
