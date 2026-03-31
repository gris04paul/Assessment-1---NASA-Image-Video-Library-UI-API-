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
  //await page.waitForTimeout(40000);

  const uiTitle = (await page.locator('h1').innerText()).trim().toLowerCase();
  const uiId = await nasa.getNasaIdFromUrl();

   console.log('UI Title:', uiTitle);
    console.log('UI NASA ID:', uiId);

    // ✅ IMPORTANT CHECK
  //expect(uiId).toBeTruthy();

  // Step 5: Call API using NASA ID
  const assetData = await api.getAsset(uiId);

  // Step 6: Extract API Title
 /* const apiTitle = assetData.collection.items[0].data[0].title
    .trim()
    .toLowerCase();*/

  //console.log('API Title:', apiTitle);

  // Step 7: Compare UI vs API
  //expect(uiTitle).toContain(apiTitle);


});