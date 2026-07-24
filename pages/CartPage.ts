import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartHeading: Locator;
  readonly quantitySelect: Locator;
  readonly subtotalText: Locator;
  readonly removeButton: Locator;
  readonly startShoppingLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartHeading = page.getByRole('heading', { name: /Your Cart/ });
    this.quantitySelect = page.getByRole('combobox');
    this.subtotalText = page.getByText(/Subtotal/);
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.startShoppingLink = page.getByRole('link', { name: 'Start Shopping' });
  }

  async setQuantity(value: string) {
    await this.quantitySelect.selectOption(value);
  }

  async removeItem() {
    await this.removeButton.click();
  }

  headingWithCount(count: number): Locator {
    return this.page.getByRole('heading', { name: `Your Cart (${count})` });
  }
}
