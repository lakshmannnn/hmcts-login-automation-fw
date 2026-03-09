class AuthPage {
  get loginUsername() { return '#user-name'; }
  get loginPassword() { return '#password'; }
  get loginSubmit() { return '#login-button'; }
  get burgerMenu() { return '#react-burger-menu-btn'; }
  get inventoryList() { return '.inventory_list'; }
  get errorMessage() { return '[data-test="error"]'; }

  navigateToHome() {
    cy.visit('/');
  }

  loginUser(user, pass) {
    cy.get(this.loginUsername).should('be.visible');
    this.typeAndVerify(this.loginUsername, user);
    this.typeAndVerify(this.loginPassword, pass);
    cy.get(this.loginSubmit).click();
  }

  verifyLoggedIn() {
    cy.get(this.burgerMenu, { timeout: 10000 }).should('be.visible').and('have.text', 'Open Menu');
    cy.get(this.inventoryList).should('be.visible');
  }

  verifyNotLoggedIn() {
    cy.get(this.loginUsername, { timeout: 10000 }).should('be.visible');
  }

  verifyUrl() {
    cy.url().should('include', '/inventory.html');
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

    attemptLoginOnlyUsername(user) {
    if (user !== undefined) this.typeAndVerify(this.loginUsername, user);
    cy.get(this.loginSubmit).click();
  }
    attemptLoginOnlyPasssword(pass) {
    if (pass !== undefined) this.typeAndVerify(this.loginPassword, pass);
    cy.get(this.loginSubmit).click();
  }

}

export default AuthPage;
