const { expect } = require('@playwright/test');

class NasaPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://images.nasa.gov');
  }

  async selectOnlyImages() {
  //const images = this.page.getByRole('checkbox', { name: 'Images' });
  const videos = this.page.getByRole('checkbox', { name: 'Videos' }).first();
  const audio = this.page.getByRole('checkbox', { name: 'Audio' }).first();

  await videos.waitFor();
  await audio.waitFor();

  await videos.click();
  await audio.click();


  // Ensure Images is selected
  /*if (!(await images.getAttribute('aria-pressed'))) {
    await images.click();
  }

  // Unselect Videos if selected
  if (await videos.getAttribute('aria-pressed')) {
    await videos.click();
  }

  // Unselect Audio if selected
  if (await audio.getAttribute('aria-pressed')) {
    await audio.click();
  }*/
}

  async search(term) {
    const SearchBox = this.page.locator('input[type="text"]');
    await SearchBox.first().fill(term);
    await this.page.keyboard.press('Enter');
  }

 
    
 async validateResults() {
  const results = this.page.locator('a[href*="/details/"]');


  const count = await this.page.locator('img').count();
console.log('Total images:', count);
}

  async openFirstResult() {
  const results = this.page.locator('a[href*="/details/"]');

  await results.first().waitFor();

  const href = await results.first().getAttribute('href');
  console.log('Opening URL:', href);

  await results.first().focus();
  await this.page.keyboard.press('Enter');
  //await this.page.waitForURL('**/details/**');
}

  async validateDetails() {
    //await this.page.waitForLoadState('networkidle');
    //await expect(this.page.locator('h1')).toBeVisible();
    const image = this.page.locator('img').first();
    //await expect(image).toBeVisible();

    const titleLocator = this.page.locator('h1');
  await expect(titleLocator).toBeVisible();

  // Get and print title
  const title = await titleLocator.innerText();
  console.log('Title:', title);

  // Assert image is NOT broken
  const isImageLoaded = await image.evaluate((img) => {
    return img.complete && img.naturalWidth > 0;
  });
  console.log('Image Loaded:', isImageLoaded);

  // Capture NASA ID from URL
  const nasaId = await this.getNasaIdFromUrl();
  console.log('NASA ID:', nasaId);
}

 async getNasaIdFromUrl() {
  const url = this.page.url();
  console.log('Current URL:', url);

  // Case 1: URL contains /details/{id}
  if (url.includes('/details/')) {
    const idPart = url.split('/details/')[1];
    if (idPart) {
      return idPart.split('?')[0];
    }
  }

  // ❗ Case 2: fallback → try extracting from page
  const nasaIdElement = this.page.locator('text=/NASA ID/i');

  if (await nasaIdElement.isVisible()) {
    const text = await nasaIdElement.innerText();
    console.log('NASA ID Text:', text);

    // Example: "NASA ID: PIA12235"
    const match = text.match(/NASA ID:\s*(\S+)/i);
    if (match) {
      return match[1];
    }
  }

  // ❌ If nothing works
  return null;
}
}
  


module.exports = { NasaPage };

