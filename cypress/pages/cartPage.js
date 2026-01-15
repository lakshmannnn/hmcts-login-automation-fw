class CartPage {
  get cartLink() {
    return '#cartur';
  }

  get cartTableRows() {
    return '#tbodyid tr';
  }

  get cartTotal() {
    return '#totalp';
  }

  openCart() {
    cy.get(this.cartLink).click();
  }

  verifyProductInCart(name) {
    cy.get(this.cartTableRows, { timeout: 10000 }).should('contain.text', name);
  }

  verifyCartTotalGreaterThanZero() {
    cy.get(this.cartTotal, { timeout: 10000 })
      .invoke('text')
      .then((t) => parseInt(t, 10))
      .should('be.greaterThan', 0);
  }
}

export default CartPage;