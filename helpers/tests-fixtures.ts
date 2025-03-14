import { test as baseTest } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

export type TestOptions = {
  goToHomePage: string;
  pageManager: PageManager;
  isPhone: boolean;
};

export const test = baseTest.extend<TestOptions>({
  goToHomePage: [
    async ({ page }, use) => {
      await page.goto('/');
      await use('');
    },
    { auto: true, title: 'Go to Home Page' },
  ],

  pageManager: [
    async ({ page }, use) => {
      const pm = new PageManager(page);
      await use(pm);
    },
    { title: 'Set up Page Manager' },
  ],

  isPhone: [
    async ({ page, isMobile }, use) => {
      const width = page.viewportSize()?.width;
      const isPhone = isMobile && width! < 768;
      await use(isPhone);
    },
    { auto: true, title: 'Set up isPhone' },
  ],
});
