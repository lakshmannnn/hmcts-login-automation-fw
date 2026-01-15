Feature: Authentication Cache Clear
  As a user
  I want to understand the behavior of authentication after cache clear
  So that I know if sessions persist

  Background:
    Given I navigate to the DemoBlaze homepage
    When I prepare the test environment

  @cache @authentication
  Scenario: Verify login status after cache deletion
    When I register a new unique user
    And I log in with the registered user
    Then I should be successfully logged in
    When I clear the browser cache and storage
    And I refresh the page
    Then I should not be logged in