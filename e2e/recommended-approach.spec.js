import { test, expect } from '@playwright/test';

test('recommended approach example works', async ({ page }) => {
  await page.goto('recommended-approach.html');

  await page.waitForLoadState('networkidle')

  const body = page.locator('body')
  const innerText = await body.innerText()
  const h1 = page.locator('h1')
  const p = page.locator('p')
  const button = page.locator('button')


  // Check that the page loads and renders the initial content
  expect(innerText).toContain('Hello World!')
  await expect(h1).toHaveText('Hello World!');
  await expect(p).toHaveText('Counter: 0');

  // Test the increment functionality
  await expect(button).toHaveText('Increment with signal');

  // Click the button and verify the counter increments
  await button.click();
  await expect(p).toHaveText('Counter: 1');

  await button.click();
  await expect(p).toHaveText('Counter: 2');

  await button.click();
  await expect(p).toHaveText('Counter: 3');
});
