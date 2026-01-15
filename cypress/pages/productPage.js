class ProductPage {
  get addToCartBtn() {
    return 'a.btn-success';
  }

  addToCart() {
    cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
    cy.get(this.addToCartBtn, { timeout: 10000 }).click();
  }

  verifyProductAddedConfirmation() {
    cy.get('@alert').should('have.been.called');
    cy.get('@alert').its('firstCall.args.0').should('match', /product added|added/i);
  }
}

export default ProductPage;