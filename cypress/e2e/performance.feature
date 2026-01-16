Feature: Performance Authentication Tests
  As a tester
  I want to test performance of login
  So that I can ensure fast response times

  Background:
    Given I navigate to the DemoBlaze homepage
    When I prepare the test environment

  @performance
  Scenario: Login - Response time
    When I login with existing logons
    Then The user should be logged in under 2 seconds response time

    @performance
  Scenario: Rapid typing in login field
    When I rapidly type username in the username field and click Login button
    Then UI should remain responsive and show no unexpected errors