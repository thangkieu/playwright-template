import test, { expect } from '@playwright/test';

test('Should render the page', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
});
