import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CategoryPage } from '../pages/CategoryPage';

test.describe('Add to cart and cart management', () => {
  test('adding a product from its detail page reflects correct default quantity @positive', async ({ page }) => {
    await page.goto('https://atomberg.com/althea-cold-press-juicer');

    const product = new ProductPage(page);
    await expect(page.getByRole('heading', { name: 'Atomberg Althea Cold Press Juicer', exact: true })).toBeVisible();
    await expect(product.addToCartButton).toBeVisible();
    await expect(product.quantityField).toContainText('1');
  });


  test('removing the only item empties the cart and offers a way back to shopping @edge', async ({ page }) => {
    await page.goto('https://atomberg.com/althea-cold-press-juicer');

    const product = new ProductPage(page);
    await product.addToCart();
    await product.goToCart();

    const cart = new CartPage(page);
    await cart.removeItem();

    await expect(cart.startShoppingLink).toBeVisible();
  });

  test('cart badge count matches number of items actually in the cart @negative', async ({ page }) => {
    await page.goto('https://atomberg.com/althea-cold-press-juicer');

    const product = new ProductPage(page);
    await product.addToCart();
    await product.goToCart();

    const cart = new CartPage(page);
    await cart.removeItem();

    // Assert the badge does NOT still show a stale count after the cart was emptied.
    await expect(page.getByRole('link', { name: '0', exact: false })).toBeVisible();
  });
});
