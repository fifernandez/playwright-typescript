import { expect } from '@playwright/test';

import { test } from '../../utils/fixtures/ui';

test(
  'ID-000 | Verify items are displayed for each category',
  { tag: ['@regression', '@desktop', '@mobile'] },
  async ({ pageManager }) => {
    const categories = ['Phones', 'Laptops', 'Monitors'];

    for (const [index, category] of categories.entries()) {
      await test.step(`${index + 1}. Click on ${category} category and verify items are displayed`, async () => {
        const itemCount = await pageManager.homePage.clickCategory(category);
        expect(itemCount, `Verify items are displayed for ${category} category`).toBeGreaterThan(0);
        await expect(
          pageManager.homePage.cardTitle,
          `Verify number of items displayed for ${category} category is the same as the number of items returned by the backend`,
        ).toHaveCount(itemCount);
      });
    }
  },
);

test(
  'ID-001 | Verify invalid phones are not visible',
  { tag: ['@regression', '@desktop', '@mobile'] },
  async ({ pageManager }) => {
    await pageManager.homePage.clickCategory('phones');
    const allCards = await pageManager.homePage.cardTitle.all();

    for (const card of allCards) {
      const cardTitle = await card.innerText();
      expect(cardTitle, `Phone with name '${cardTitle}' does not contain 'Invalid Phone'`).not.toContain(
        'Invalid Phone',
      );
    }
  },
);
