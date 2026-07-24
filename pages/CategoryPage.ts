import { Page, Locator } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;
  readonly categoryDropdownButton: Locator;
  readonly sweepSizeFilterButton: Locator;
  readonly priceFilterButton: Locator;
  readonly listViewButton: Locator;
  readonly addToCartButtons: Locator;
  readonly proceedToCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryDropdownButton = page.getByRole('button', { name: 'Category Dropdown' });
    this.sweepSizeFilterButton = page.getByRole('button', { name: 'Sweep Size' });
    this.priceFilterButton = page.getByRole('button', { name: 'Price' });
    this.listViewButton = page.getByRole('button', { name: 'List View' });
    this.addToCartButtons = page.getByRole('button', { name: 'Add to Cart' });
    this.proceedToCartLink = page.getByRole('link', { name: 'Proceed to Cart' });
  }

  async goto(categoryPath: string) {
    await this.page.goto(`https://atomberg.com/${categoryPath}`);
  }

  async openCategoryDropdown() {
    await this.categoryDropdownButton.click();
  }

  async selectSubCategory(name: string) {
    await this.page.getByRole('link', { name, exact: true }).click();
  }

  async applyPriceFilter(labelText: string) {
    await this.priceFilterButton.click();
    await this.page.locator('label').filter({ hasText: labelText }).click();
  }

  async addNthProductToCart(index: number) {
    await this.addToCartButtons.nth(index).click();
  }

  productByName(name: string): Locator {
    return this.page.locator('div').filter({ hasText: new RegExp(`^${name}$`) });
  }

  productLinkByName(name: string): Locator {
    return this.page.getByRole('link', { name });
  }
}
