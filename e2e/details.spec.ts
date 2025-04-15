import { test, expect } from '@playwright/test';

test('if has TicketSwap Logo', async ({ page }) => {
  await page.goto('/details/9');
  const logo = await page.locator('[data-testid="ticketSwapLogo"]').first();
  await expect(logo).toBeVisible();
});

test('if Louis Tomlinson title is present', async ({ page }) => {
  await page.goto('/details/9', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Louis Tomlinson', { exact: true })).toBeVisible();
});

test('if Buy tickets now button is present ', async ({ page }) => {
  await page.goto('/details/9');
  const buyNowButton = await page.getByRole('button', { name: 'Buy tickets now!' })
  await expect(buyNowButton).toBeVisible();
});

test('if More Info is present ', async ({ page }) => {
  await page.goto('/details/9');
  const moreInfoTitle = await page.getByRole('heading', { name: 'More info' })
  await expect(moreInfoTitle).toBeVisible();
});

test('if More Info is hidden if event does not have description ', async ({ page }) => {
  await page.goto('/details/3');
  const moreInfoTitle = await page.getByRole('heading', { name: 'More info' })
  await expect(moreInfoTitle).not.toBeVisible();
});
