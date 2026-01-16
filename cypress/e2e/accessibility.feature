Feature: Accessibility Authentication Tests
  As a user
  I want to test accessibility features
  So that I can ensure usability for all users

  Background:
    Given I navigate to the DemoBlaze homepage
    When I prepare the test environment

  @accessibility
  Scenario: Keyboard navigation for login
    When I focus the username and password inputs and type using the keyboard
    Then I should be able to navigate and login