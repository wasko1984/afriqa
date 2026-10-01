import { test, expect } from '@playwright/test';
import { samplePlan } from './fixtures';
test('submitting a problem navigates to the complete results page', async ({page}) => {
  await page.route('**/api/plan', route => route.fulfill({json:{plan:samplePlan()}}));
  await page.goto('/');
  await page.getByLabel('What problem are you facing?').fill('My food business is losing customers.');
  await page.getByRole('button',{name:'Submit',exact:true}).click();
  await expect(page).toHaveURL(/\/results$/);
  await expect(page.getByRole('heading',{name:'Your next three actions'})).toBeVisible();
  await expect(page.getByText('Day 7',{exact:true})).toBeVisible();
  await expect(page.getByText('Medium priority',{exact:true})).toBeVisible();
  await page.reload();
  await expect(page.getByRole('link',{name:'Describe your problem'})).toBeVisible();
});
test('retry preserves the submitted problem after failure', async ({page}) => {
  let attempt=0;
  await page.route('**/api/plan', async route => {
    expect(route.request().postDataJSON().problem).toBe('My business is losing customers.');
    attempt++;
    await route.fulfill(attempt===1?{status:502,json:{error:{message:'Unable to generate a complete plan. Please retry.'}}}:{json:{plan:samplePlan()}});
  });
  await page.goto('/');
  await page.getByLabel('What problem are you facing?').fill('My business is losing customers.');
  await page.getByRole('button',{name:'Submit',exact:true}).click();
  await expect(page.getByRole('button',{name:'Retry',exact:true})).toBeVisible();
  await page.getByLabel('What problem are you facing?').fill('An edited problem');
  await page.getByRole('button',{name:'Retry',exact:true}).click();
  await expect(page).toHaveURL(/\/results$/);
});
test('results without a generated plan provides a way back', async ({page}) => {
  await page.goto('/results');
  await expect(page.getByRole('link',{name:'Describe your problem'})).toBeVisible();
});
test('blank input does not start generation', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button',{name:'Submit',exact:true}).click();
  await expect(page.locator('main').getByRole('alert')).toContainText('Enter a problem');
  await expect(page).toHaveURL(/\/$/);
});
