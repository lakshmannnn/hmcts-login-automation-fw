class AuthPage {
  get signupBtn() {
    return '#signin2';
  }

  get signupUsername() {
    return '#sign-username';
  }

  get signupPassword() {
    return '#sign-password';
  }

  get signupSubmit() {
    return 'button[onclick="register()"]';
  }

  get loginBtn() {
    return '#login2';
  }

  get loginUsername() {
    return '#loginusername';
  }

  get loginPassword() {
    return '#loginpassword';
  }

  get loginSubmit() {
    return 'button[onclick="logIn()"]';
  }

  get navbarWelcome() {
    return '#nameofuser';
  }

  navigateToHome() {
    cy.visit('/index.html');
  }

  registerUser(user, pass) {
    cy.get(this.signupBtn).click();
    cy.get('#signInModal').should('be.visible').and('have.class', 'show');
    this.typeAndVerify(this.signupUsername, user);
    this.typeAndVerify(this.signupPassword, pass);

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });

    cy.get(this.signupSubmit).click();
    cy.get('@alert').should('have.been.called');
    cy.get('#signInModal').within(() => {
      cy.contains('button', 'Close').click({ force: true });
    });
    cy.get('#signInModal').should('not.be.visible');
  }

  loginUser(user, pass) {
    cy.get('#signInModal').should('not.be.visible');
    cy.get(this.loginBtn).click();
    cy.get(this.loginUsername).should('be.visible');
    this.typeAndVerify(this.loginUsername, user);
    this.typeAndVerify(this.loginPassword, pass);
    cy.get(this.loginSubmit).click();
  }


  verifyLoggedIn() {
    cy.get(this.navbarWelcome, { timeout: 10000 }).should('be.visible');
  }

    verifyNotLoggedIn() {
    cy.get(this.navbarWelcome, { timeout: 10000 }).should('not.be.visible');
  }
  verifyWelcomeMessage(user) {
    cy.get(this.navbarWelcome).should('contain.text', `Welcome ${user}`);
  }

  typeAndVerify(selector, value) {
    cy.get(selector)
      .click({ force: true })
      .clear({ force: true })
      .type(value, { delay: 0, force: true })
      .should('have.value', value);
  }

  attemptLogin(user, pass) {
    cy.get(this.loginBtn).click();
    cy.get(this.loginUsername).should('be.visible');
    if (user) this.typeAndVerify(this.loginUsername, user);
    if (pass) this.typeAndVerify(this.loginPassword, pass);
    cy.get(this.loginSubmit).click();
  }
}

export default AuthPage;