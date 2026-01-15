class HomePage {
  get categoryLink() {
    return '.list-group a';
  }

  get productLink() {
    return '.card-title a';
  }

  openCategory(category) {
    cy.contains(this.categoryLink, category).click();
  }

  openProduct(productName) {
    cy.contains(this.productLink, productName, { timeout: 10000 }).click();
  }
}

export default HomePage;