/* eslint-disable playwright/no-wait-for-timeout */
import { test } from '../../helpers/tests-fixtures';
import { expect } from '@playwright/test';

test(
  'Verify invalid phones are not visible',
  { tag: ['@Regression', '@desktop', '@mobile'] },
  async ({ pageManager }) => {
    await pageManager.homePage.phones.click();
    await pageManager.homePage.page.waitForTimeout(3000);
    const allCards = await pageManager.homePage.cardTitle.all();

    for (let i = 0; i < allCards.length; i++) {
      const cardTitle = await allCards[i].innerText();
      expect(cardTitle, "Phone with name 'Invalid Phone' is visible").not.toContain('Invalid Phone');
    }
  },
);
