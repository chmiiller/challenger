import { test, expect } from '@playwright/test';

const searchPlaceholder = 'Search artists, events, places...';

test('if it has the correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/TicketSwap Challenger - Carlos Zinato/);
});

test('if has TicketSwap Logo', async ({ page }) => {
  await page.goto('/');
  const logo = await page.locator('[data-testid="ticketSwapLogo"]').first();
  await expect(logo).toBeVisible();
});

test('if has a search bar', async ({ page }) => {
  await page.goto('/');
  const searchBar = await page.getByPlaceholder(searchPlaceholder);
  await expect(searchBar).toBeVisible();
});

test('if Down The Rabbit Hole card is on the list ', async ({ page }) => {
  await page.goto('/');
  const card = await page.getByRole('link', { name: 'Down The Rabbit Hole' })
  await expect(card).toBeVisible();
});

test('if search for "Rabbit" limits result to only this card on the list ', async ({ page }) => {
  await page.goto('/');
  const inputSelector = `input[placeholder="${searchPlaceholder}"]`;
  await page.fill(inputSelector, 'rabbit');
  await page.waitForTimeout(300); // searchBar has a debounce of 200ms
  
  const rabbitHoleCard = await page.getByRole('link', { name: 'Down The Rabbit Hole' })
  const lowlandsCard = await page.getByRole('link', { name: 'Lowlands Festival' })
  await expect(rabbitHoleCard).toBeVisible();
  await expect(lowlandsCard).not.toBeVisible();
});
