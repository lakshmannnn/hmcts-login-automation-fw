Feature: Basic User Authentication
  As a potential customer
  I want to register and login to the DemoBlaze website
  So that I can access personalized shopping features

  Background:
    Given I navigate to the DemoBlaze homepage
    When I prepare the test environment

  @smoke
  Scenario: Successful user registration and login
    When I register a new unique user
    And I log in with the registered user
    Then I should be successfully logged in
    And I should see the welcome message for the registered user