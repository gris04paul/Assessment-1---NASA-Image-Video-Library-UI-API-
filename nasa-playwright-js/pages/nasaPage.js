const { expect } = require('@playwright/test');

class NasaPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://images.nasa.gov');
  }

  async selectOnlyImages() {
  const videos = this.page.getByRole('checkbox', { name: 'Videos' }).first();
  const audio = this.page.getByRole('checkbox', { name: 'Audio' }).first();

  await videos.waitFor();
  await audio.waitFor();

  await videos.click();
  await audio.click();


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
  
}

  async validateDetails() {
    const image = this.page.locator('img').first();
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

  
  if (url.includes('/details/')) {
    const idPart = url.split('/details/')[1];
    if (idPart) {
      return idPart.split('?')[0];
    }
  }

  
  const nasaIdElement = this.page.locator('text=/NASA ID/i');

  if (await nasaIdElement.isVisible()) {
    const text = await nasaIdElement.innerText();
    console.log('NASA ID Text:', text);

    
    const match = text.match(/NASA ID:\s*(\S+)/i);
    if (match) {
      return match[1];
    }
  }

 
  return null;
}
}
  

module.exports = { NasaPage };

