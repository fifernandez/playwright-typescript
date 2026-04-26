import { expect } from '@playwright/test';

import Global from '../../helpers/global';
import { test } from '../../utils/fixtures/ui';

test(
  'ID-002 | Verify successful login',
  { tag: ['@smoke', '@desktop', '@mobile', '@login'] },
  async ({ pageManager }) => {
    const testAccount = Global.getUserAccount('first-account');

    await test.step('1. Login user', async () => {
      await pageManager.homePage.navBar.login.click();
      await pageManager.homePage.loginDialog.loginUser(testAccount.username, testAccount.password);
    });

    await test.step('2. Verify user is logged in', async () => {
      await expect(
        pageManager.homePage.loginDialog.loginButton,
        'Verify login button is no longer visible',
      ).toBeHidden();
      await expect(pageManager.homePage.navBar.logout, 'Verify logout button is visible').toBeVisible();
    });
  },
);
