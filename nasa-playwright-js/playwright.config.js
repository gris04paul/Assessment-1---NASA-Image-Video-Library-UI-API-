const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    headless: false,
    launchOptions: {
    slowMo: 800,
    baseURL: 'https://images.nasa.gov',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  reporter: [['html']],
},
  });