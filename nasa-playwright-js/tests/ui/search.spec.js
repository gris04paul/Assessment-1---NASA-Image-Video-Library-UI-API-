const { test } = require('@playwright/test');
const { NasaPage } = require('../../pages/nasaPage');

test('Task - A - UI - Search and validate moon images', async ({ page }) => {
  const nasa = new NasaPage(page);
  await page.goto('https://images.nasa.gov');
  await nasa.navigate();
  await nasa.selectOnlyImages();
  await nasa.search('moon');
  await page.waitForTimeout(4000);
  await nasa.validateResults();
  await page.waitForTimeout(6000);
  await nasa.openFirstResult();
 
  await nasa.validateDetails();
  
});