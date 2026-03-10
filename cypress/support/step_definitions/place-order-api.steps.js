const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

const jsonContentType = /application\/json/;

function setOrderContext(order) { Cypress.env('orderPayload', order); }
function getOrderContext() { return Cypress.env('orderPayload'); }
function setOrderId(id) { Cypress.env('orderId', id); }
function getOrderId() { return Cypress.env('orderId'); }

function getInvalidPayload(type) {
  const base = { petId: 1, quantity: 1, status: 'placed', complete: false };
  switch (type) {
    case 'missing_petId':           return { ...base, petId: undefined };
    case 'invalid_quantity_type':   return { ...base, quantity: 'ten' };
    case 'invalid_status_value':    return { ...base, status: 'shipped' };
    case 'negative_quantity':       return { ...base, quantity: -5 };
    case 'zero_quantity':           return { ...base, quantity: 0 };
    case 'empty_payload': return {  };
    default:                        return { petId: 'abc' };
  }
}

Given('I have a valid order payload', () => {
  cy.fixture('order.json').then((data) => {
    const now = new Date().toISOString();
    const order = { ...data.valid, shipDate: now, id: Date.now() };
    setOrderContext(order);
  });
});

Given('I have a valid order payload with status {string}', (status) => {
  cy.fixture('order.json').then((data) => {
    const now = new Date().toISOString();
    const order = { ...data.valid, shipDate: now, id: Date.now(), status };
    setOrderContext(order);
  });
});

Given('I have an invalid order payload for {string}', (invalidCase) => {
  const payload = getInvalidPayload(invalidCase);
  setOrderContext(payload);
});

Given('I have an invalid order payload', () => {
  cy.fixture('order.json').then((data) => setOrderContext(data.invalidTypes));
});

Given('I have a non-existent order id', () => {
  setOrderId(999999999999);
});

Given('I have created an order via POST {string}', (path) => {
  cy.fixture('order.json').then((data) => {
    const payload = { ...data.valid, id: Date.now(), shipDate: new Date().toISOString() };
    setOrderContext(payload);

    cy.request({
      method: 'POST',
      url: Cypress.env("API_URL") + path,
      body: payload,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      setOrderId(resp.body.id);
    });
  });
});

When('I send a POST request to {string} with the order payload', (path) => {
  const payload = getOrderContext();
  cy.request({
    method: 'POST',
    url: Cypress.env("API_URL") + path,
    body: payload,
    failOnStatusCode: false,
  }).as('lastResponse');
});

When('I send a GET request to {string}', (templatedPath) => {
  const id = getOrderId();
  const path = templatedPath.replace('{orderId}', String(id));
  cy.request({ method: 'GET', url: Cypress.env("API_URL") + path, failOnStatusCode: false }).as('lastResponse');
});

When('I send a DELETE request to {string}', (templatedPath) => {
  const id = getOrderId();
  const path = templatedPath.replace('{orderId}', String(id));
  cy.request({ method: 'DELETE', url: Cypress.env("API_URL") + path, failOnStatusCode: false }).as('lastResponse');
});

When('I send a malformed JSON POST request to {string}', (path) => {
  cy.request({
    method: 'POST',
    url: Cypress.env("API_URL") + path,
    body: "this is not valid json {",
    headers: { 'Content-Type': 'application/json' },
    failOnStatusCode: false,
  }).as('lastResponse');
});

When('I send a duplicate JSON POST request to {string}', (path) => {
    const payload = getOrderContext();
  cy.request({
    method: 'POST',
    url: Cypress.env("API_URL") + path,
    body: payload,
    headers: { 'Content-Type': 'application/json' },
    failOnStatusCode: false,
  }).as('duplicateResponse1');

    cy.request({
    method: 'POST',
    url: Cypress.env("API_URL") + path,
    body: payload,
    headers: { 'Content-Type': 'application/json' },
    failOnStatusCode: false,
  }).as('duplicateResponse2');

});

Then('the response status should be {int}', (status) => {
  cy.get('@lastResponse').its('status').should('eq', status);
});

Then('the response status should be one of {int}, {int}, {int}', (s1, s2, s3) => {
  cy.get('@lastResponse').its('status').should('be.oneOf', [s1, s2, s3]);
});

Then('the response status should be one of {int}, {int}', (s1, s2) => {
  cy.get('@lastResponse').its('status').should('be.oneOf', [s1, s2]);
});

Then('the response content-type should contain {string}', (ct) => {
  cy.get('@lastResponse').its('headers').its('content-type').should('contain', ct);
});

Then('the response body should match the order schema', () => {
  cy.get('@lastResponse').its('body').then((body) => {
    expect(body).to.have.all.keys('id', 'petId', 'quantity', 'shipDate', 'status', 'complete');
    expect(body.id).to.be.a('number');
    expect(body.petId).to.be.a('number');
    expect(body.quantity).to.be.a('number').and.to.be.greaterThan(0);
    expect(body.status).to.be.oneOf(['placed', 'approved', 'delivered']);
    expect(body.complete).to.be.a('boolean');
  });
});

Then('the response body should contain the same order details', () => {
  cy.get('@lastResponse').its('body').then((body) => {
    const order = getOrderContext();
    expect(body).to.include({ id: order.id, petId: order.petId, quantity: order.quantity });
    expect(body).to.have.property('shipDate');
  });
});

Then('the response body status should be {string}', (expectedStatus) => {
  cy.get('@lastResponse').its('body.status').should('eq', expectedStatus);
});

Then('subsequent GET to {string} should return {int}', (templatedPath, expected) => {
  const id = getOrderId();
  const path = templatedPath.replace('{orderId}', String(id));
  cy.request({
    method: 'GET',
    url: Cypress.env("API_URL") + path,
    failOnStatusCode: false
  }).then((resp) => expect(resp.status).to.eq(expected));
});

Then('both duplicate responses should have status {int}', (status) => {
  cy.get('@duplicateResponse1').its('status').should('eq', status);
  cy.get('@duplicateResponse2').its('status').should('eq', status);
});