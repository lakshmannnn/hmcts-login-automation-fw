Feature: Petstore - Place Order for a Pet
  As an API consumer
  I want to test the /store/order endpoint comprehensively
  So that I can validate order creation, retrieval, deletion and error handling

  @happy_path @api @smoke  @basicUIAPI
  Scenario: Place an order successfully
    Given I have a valid order payload
    When I send a POST request to "/store/order" with the order payload
    Then the response status should be 200
    And the response content-type should contain "application/json"
    And the response body should match the order schema

  @happy_path @api @basicUIAPI
  Scenario Outline: Place order with different valid status values
    Given I have a valid order payload with status "<status>"
    When I send a POST request to "/store/order" with the order payload
    Then the response status should be 200
    And the response body status should be "<status>"

    Examples:
      | status    |
      | placed    |
      | approved  |
      | delivered |

  @retrieve @api @basicUIAPI
  Scenario: Retrieve an order by id after placing it
    Given I have created an order via POST "/store/order"
    When I send a GET request to "/store/order/{orderId}"
    Then the response status should be 200
    And the response body should contain the same order details

  @delete @api @basicUIAPI
  Scenario: Delete an existing order by id
    Given I have created an order via POST "/store/order"
    When I send a DELETE request to "/store/order/{orderId}"
    Then the response status should be 200
    And subsequent GET to "/store/order/{orderId}" should return 404

  @negative @api @basicUIAPI
  Scenario: Retrieve a non-existent order returns 404
    Given I have a non-existent order id
    When I send a GET request to "/store/order/{orderId}"
    Then the response status should be 404

    # There is no required/mandatory field in the API schema as per OpenAPI schema spec, hence I have used 200 to assert the response below.

  @negative @api @basicUIAPI
  Scenario Outline: Placing an order with invalid data returns client or server error
    Given I have an invalid order payload for "<invalidCase>"
    When I send a POST request to "/store/order" with the order payload
    Then the response status should be one of 400, 500, 200

    Examples:
      | invalidCase           |
      | missing_petId         |
      | invalid_quantity_type |
      | invalid_status_value  |
      | negative_quantity     |
      | zero_quantity         |
      | empty_payload         |

  @negative @api @basicUIAPI
  Scenario: Send malformed JSON to the order endpoint
    When I send a malformed JSON POST request to "/store/order"
    Then the response status should be one of 400, 415

# There is no restriction on duplicate order creation as per API behaviour
  @negative @api @basicUIAPI
  Scenario: Duplicate order creation via order endpoint
    When I send a duplicate JSON POST request to "/store/order"
    Then both duplicate responses should have status 200

