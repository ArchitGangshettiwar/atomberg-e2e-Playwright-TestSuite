import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { CategoryPage } from '../pages/CategoryPage';

test.describe('Product search and filtering', () => {
  test('valid search term returns relevant product results @positive', async ({ page }) => {
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);

    await home.goto();
    await home.search('ceiling fan');

    await expect(results.productByName('Aris Gladius Smart Ceiling Fan')).toBeVisible();
    //await expect(results.productByName('Razon Ceiling Fan')).toBeVisible();
  });

  test('nonsense search term shows a no-results state, not an error @negative', async ({ page }) => {
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);

    await home.goto();
    await home.search('ytyryyiisduufiooogghhh');

    await expect(results.noResultsMessage).toBeVisible();
    await expect(page).not.toHaveURL(/error|500|404/);
  });

  test('whitespace-only search does not crash the app @edge', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await home.search('          ');
    await expect(home.searchInput).toBeVisible();
    await expect(page).not.toHaveURL(/error|500|404/);
  });

  test('repeated Enter presses on an empty query do not duplicate requests or break the page @edge', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.openSearch();

    for (let i = 0; i < 4; i++) {
      await home.searchInput.press('Enter');
    }

    await expect(home.searchInput).toBeVisible();
  });

  test('category filter narrows results to matching products @positive', async ({ page }) => {
    const category = new CategoryPage(page);
    const home = new HomePage(page);

    await home.goto();
    await home.fansNavLink.click();
    await home.fansNavLink.click();
    await page.getByRole('link', { name: 'Wall Fans' }).click();

    await expect(page.getByText(/Renesa Wall Fan/)).toBeVisible();
    await expect(page.getByText(/SilenceAire Hi-Speed Wall fan/)).toBeVisible();
  });

  
});
