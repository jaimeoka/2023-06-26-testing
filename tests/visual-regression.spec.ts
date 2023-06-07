import { expect, test } from '@playwright/test';

for (const story of [
  'default',
  'minimal',
  'overflown',
  'sold-out',
  'empty',
  'tiny-image',
  'on-sale',
  'sale-and-sold',
]) {
  test(`visual regression for ${story}`, async ({ page }) => {
    await page.goto(
      `http://localhost:4400/iframe.html?id=eternal-holiday-card--${story}&viewMode=story`
    );
    await expect(page).toHaveScreenshot();
  });
}
