Feature: Basic User Authentication
  As a potential customer
  I want to login to the Sauce Demo website
  So that I can access the products page

  Background:
    Given I navigate to the Sauce Demo login page
    When I prepare the test environment

  @smoke
  Scenario: Successful login for a standard user
    When I use a valid standard user
    And I log in with the standard user
    Then I should be successfully logged in
    And I should see the products page
