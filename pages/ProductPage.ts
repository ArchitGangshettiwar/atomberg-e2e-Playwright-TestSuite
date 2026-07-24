import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly quantityField: Locator;
  readonly productHeading: Locator;
  readonly proceedToCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.quantityField = page.locator('#quantity');
    this.productHeading = page.getByRole('heading');
    this.proceedToCartLink = page.getByRole('link', { name: 'Proceed to Cart' });
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goToCart() {
    await this.proceedToCartLink.click();
  }
}
