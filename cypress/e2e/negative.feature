Feature: Negative Authentication Tests
  As a tester
  I want to test invalid login scenarios
  So that I can ensure proper error handling

  Background:
    Given I navigate to the DemoBlaze homepage
    When I prepare the test environment

  @negative
  Scenario: Login with empty username
    When I attempt to login with empty username and valid password
    Then I should see an alert message for empty username

  @negative
  Scenario: Login with null password
    When I attempt to login with valid username and null password
    Then I should see an alert message for empty password

  @negative
  Scenario: Login with special characters in username
    When I attempt to login with special characters in username
    Then I should see an alert message for invalid username

  @negative
  Scenario: Login with international characters in username
    When I attempt to login with international characters in username
    Then I should see an alert message for invalid username

  @negative
  Scenario: Login with valid username and invalid password
    When I attempt to login with valid username and invalid password
    Then I should see an alert message for wrong password

  @negative
  Scenario: Login with invalid username and valid password
    When I attempt to login with invalid username and valid password
    Then I should see an alert message for user does not exist

  @negative
  Scenario: Multi tab test after logout
    When I logout and open a new tab
    Then I should not be able to access the site in the new tab

  @negative
  Scenario: Back button after logout
    When I logout and use the back button
    Then I should not be able to access the site

  @negative
  Scenario: Boundary value analysis for password length
    When I attempt to login with password of minimum length
    Then I should see appropriate message

  @negative
  Scenario: Equivalence partitioning for username
    When I attempt to login with username in different partitions
    Then I should see appropriate messages