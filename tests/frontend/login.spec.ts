/* eslint-disable playwright/no-wait-for-timeout */
import { expect } from '@playwright/test';

import GlobalVars from '../../helpers/globalVars';
import { test } from '../../helpers/tests-fixtures';

test('Verify Successful login', { tag: ['@Smoke', '@desktop', '@mobile'] }, async ({ pageManager }) => {
  await test.step('1. Login user', async () => {
    await pageManager.homePage.login.click();
    await pageManager.loginPage.loginUser(GlobalVars.USERNAME, GlobalVars.PASSWORD);
    await pageManager.homePage.page.waitForTimeout(2000);
  });

  await test.step('2. Verify login button is no longer visible', async () => {
    await expect(pageManager.homePage.login, 'Verify login button is no longer visible').toBeHidden();
    await expect(pageManager.homePage.logout, 'Verify logout button is visible').toBeVisible();
  });
});
