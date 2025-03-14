/* eslint-disable playwright/no-wait-for-timeout */
import { test } from '../../helpers/tests-fixtures';
import { expect } from '@playwright/test';
import GlobalVars from '../../helpers/globalVars';

test(
  'Verify Successful login',
  {
    tag: ['@Smoke', '@desktop', '@mobile'],
  },
  async ({ pageManager }) => {
    await pageManager.homePage.login.click();
    await pageManager.loginPage.loginUser(GlobalVars.USERNAME, GlobalVars.PASSWORD);
    await pageManager.homePage.page.waitForTimeout(2000);
    await expect(pageManager.homePage.login, 'Verify login button is no longer visible').toBeHidden();
    await expect(pageManager.homePage.logout, 'Verify logout button is visible').toBeVisible();
  },
);
