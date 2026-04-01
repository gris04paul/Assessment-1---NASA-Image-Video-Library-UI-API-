const { test,expect } = require('@playwright/test');
const { ApiHelper } = require('../../utils/apiHelper');

test('Task - B - API - Search and get asset details', async ({ request }) => {
  const api = new ApiHelper(request);

  const data = await api.search('moon');
  const nasaId = data.nasa_id;

  const asset = await api.getAsset(nasaId);

  expect(nasaId).toBeTruthy();
  
});
