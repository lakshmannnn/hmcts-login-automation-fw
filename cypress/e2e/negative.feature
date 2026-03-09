Feature: Negative Authentication Tests
  As a tester
  I want to test invalid login scenarios
  So that I can ensure proper error handling

  Background:
    Given I navigate to the Sauce Demo login page
    When I prepare the test environment

  @negative
  Scenario: Login with empty username
    When I attempt to login with empty username and valid password
    Then I should see generic error to fix incorrect username or password

  @negative
  Scenario: Login with only username but no password
    When I attempt to login with only username but no password
    Then I should see error to enter password

  @negative
  Scenario: Login with empty password
    When I attempt to login with valid username and empty password
    Then I should see generic error to fix incorrect username or password

  @negative
  Scenario: Login with only password but no username
    When I attempt to login with only password but no username
    Then I should see error to enter username

  @negative
  Scenario: Login with special characters in username
    When I attempt to login with special characters in username
    Then I should see generic error to fix incorrect username or password

  @negative
  Scenario: Login with international characters in username
    When I attempt to login with international characters in username
    Then I should see generic error to fix incorrect username or password

  @negative
  Scenario: Login with valid username and invalid password
    When I attempt to login with valid username and invalid password
    Then I should see generic error to fix incorrect username or password

  @negative
  Scenario: Login with invalid username and valid password
    When I attempt to login with invalid username and valid password
    Then I should see generic error to fix incorrect username or password

  @negative
  Scenario: Login with locked out account
    When I attempt login with locked out user
    Then I should see error related to locked out username