import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly noResultsMessage: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.noResultsMessage = page.getByText('No products found');
    // Product titles render as divs with the exact product name text.
    // Used generically here; individual tests target specific product names when asserting relevance.
    this.productCards = page.locator('[class*="product"]');
  }

  productByName(name: string): Locator {
    return this.page.locator('div').filter({ hasText: new RegExp(`^${name}$`) });
  }
}
