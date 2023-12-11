import setup from '@playwright/test';

setup('listen to console on browser', async ({ page }) => {
  page.on('console', (msg) => console.log(msg.text()));
});

setup.skip('Login and keep the session', async ({ page, request }) => {
  // TODO: To add your own login logic here
  // await login()
  // await request.storageState({ path: loginStateFilePath });
  // Usage: add `test.use({storageState: loginStateFilePath })` before the tests
});
