class AuthPage {
  get loginUsername() { return '#user-name'; }
  get loginPassword() { return '#password'; }
  get loginSubmit() { return '#login-button'; }
  get productsTitle() { return '.title'; }
  get inventoryList() { return '.inventory_list'; }
  get errorMessage() { return '[data-test="error"]'; }

  navigateToHome() {
    cy.visit('https://www.saucedemo.com/');
  }

  loginUser(user, pass) {
    cy.get(this.loginUsername).should('be.visible');
    this.typeAndVerify(this.loginUsername, user);
    this.typeAndVerify(this.loginPassword, pass);
    cy.get(this.loginSubmit).click();
  }

  verifyLoggedIn() {
    cy.get(this.productsTitle, { timeout: 10000 }).should('be.visible').and('have.text', 'Products');
    cy.get(this.inventoryList).should('be.visible');
  }

  verifyNotLoggedIn() {
    cy.get(this.loginUsername, { timeout: 10000 }).should('be.visible');
  }

  verifyWelcomeMessage() {
    this.verifyLoggedIn();
  }

  verifyErrorMessageContains(text) {
    cy.get(this.errorMessage).should('be.visible').and('contain.text', text);
  }

  typeAndVerify(selector, value) {
    cy.get(selector)
      .click({ force: true })
      .clear({ force: true })
      .type(String(value), { delay: 0, force: true })
      .should('have.value', String(value));
  }

  attemptLogin(user, pass) {
    if (user !== undefined) this.typeAndVerify(this.loginUsername, user);
    if (pass !== undefined) this.typeAndVerify(this.loginPassword, pass);
    cy.get(this.loginSubmit).click();
  }
}

export default AuthPage;
