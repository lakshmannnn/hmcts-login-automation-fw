Feature: Performance Authentication Tests
  As a tester
  I want to test performance of login
  So that I can ensure fast response times

  Background:
    Given I navigate to the DemoBlaze homepage
    When I prepare the test environment

  @performance
  Scenario: Rapid typing in login fields
    When I rapidly type in username and password fields
    Then the user should be logged in under 2 seconds response time