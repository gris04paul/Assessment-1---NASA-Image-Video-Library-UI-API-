const { test, expect } = require('@playwright/test');
const { ApiHelper } = require('../../utils/apiHelper');
const { NasaPage } = require('../../pages/nasaPage');

test('Integration - API to UI consistency', async ({ page, request }) => {
  const api = new ApiHelper(request);
  const nasa = new NasaPage(page);


  // UI
  await nasa.navigate();
 await nasa.selectOnlyImages();
  await nasa.search('moon');
  await page.waitForTimeout(4000);
  await nasa.openFirstResult();


  const uiTitle = (await page.locator('h1').innerText()).trim().toLowerCase();
  const uiId = await nasa.getNasaIdFromUrl();

   console.log('UI Title:', uiTitle);
    console.log('UI NASA ID:', uiId);

  const assetData = await api.getAsset(uiId);

 

});
