import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchIcon: Locator;
  readonly searchInput: Locator;
  readonly cartLink: Locator;
  readonly fansNavLink: Locator;
  readonly suggestionsResultsBlock: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchIcon = page.getByRole('img', { name: 'Search' });
    this.searchInput = page.getByRole('textbox', { name: 'Search here' });
    this.cartLink = page.getByRole('link', { name: /Cart/ });
    this.fansNavLink = page.getByRole('link', { name: 'Fans', exact: true });
    this.suggestionsResultsBlock = page.locator('[class*="resultsBlock_block"]');
  }

  async goto() {
    await this.page.goto('https://atomberg.com/');
  }

  async search(term: string) {
    await this.searchIcon.click();
    await this.searchInput.fill(term);
    // Typing triggers a debounced autocomplete request; a spinner shows until
    // it resolves and the suggestion blocks render. Pressing Enter before
    // that settles races the UI, so wait for at least one suggestion block
    // to appear first.
    await this.suggestionsResultsBlock.first().waitFor({ state: 'visible', timeout: 5000 });
    await this.searchInput.press('Enter');
  }

  /**
   * Clicks a specific suggestion row in the autocomplete dropdown instead of
   * pressing Enter. Use this when the test cares about the suggestion-click
   * path rather than raw free-text submission.
   */
  async searchViaSuggestion(term: string, suggestionText: string) {
    await this.searchIcon.click();
    await this.searchInput.fill(term);
    await this.suggestionsResultsBlock.first().waitFor({ state: 'visible' });
    await this.page.getByText(suggestionText, { exact: true }).click();
  }

  async openSearch() {
    await this.searchIcon.click();
  }
}
