# BDD Test with Playwright

Playwright Test was created specifically to accommodate the needs of end-to-end testing. Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox. Test on Windows, Linux, and macOS, locally or on CI, headless or headed with native mobile emulation of Google Chrome for Android and Mobile Safari.

[Learn more about Playwright](https://playwright.dev/docs/intro)

### How to run the tests?

1. Run `pnpm i` to install `playwright` dependencies if you haven't done so
2. Run `pnpm test`

### Setup VS Code playwright (recommended)

1. Install [Playwright Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) on VSCode
2. Go to `Testing` section of the left panel
3. You should see all the test cases under `TEST EXPLORER`
4. You should be able to run all or individual test cases

### Adding your own BDD test cases

Add new BDD test cases inside `bdd` folder with format `[bdd-test-case].test.ts`
