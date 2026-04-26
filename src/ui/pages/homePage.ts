import { Locator, Page, type Response, expect } from '@playwright/test';

import { LoginModule } from '../modules/loginModule';
import { NavBarModule } from '../modules/navBarModule';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  readonly navBar: NavBarModule;
  readonly loginDialog: LoginModule;
  readonly phones: Locator;
  readonly laptops: Locator;
  readonly monitors: Locator;
  readonly cardTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.navBar = new NavBarModule(this.page);
    this.loginDialog = new LoginModule(this.page);
    this.phones = this.page.getByRole('link', { name: 'Phones' });
    this.laptops = this.page.getByRole('link', { name: 'Laptops' });
    this.monitors = this.page.getByRole('link', { name: 'Monitors' });
    this.cardTitle = this.page.locator('h4[class="card-title"]');
  }

  /**
   * Click on a category link
   * Wait for the backend to respond with the items for the category
   * Return the number of items returned by the backend.
   * @param link - The link to click on.
   * @param expectedCat - The expected category.
   * @returns The number of items displayed for the category.
   */
  private async clickCategoryLink(link: Locator, expectedCat: string): Promise<number> {
    let bycatResponse: Response | undefined;
    const onResponse = (response: Response) => {
      const request = response.request();
      if (!response.url().includes('api.demoblaze.com/bycat')) return;
      if (request.method() !== 'POST') return;
      const body = request.postDataJSON() as { cat?: string } | null;
      if (body?.cat !== expectedCat) return;
      if (!response.ok()) return;
      bycatResponse = response;
    };
    // Subscribe before the click so a fast bycat response is still observed.
    this.page.on('response', onResponse);
    await link.click();
    await expect
      .poll(() => bycatResponse !== undefined, {
        message: `Expected POST https://api.demoblaze.com/bycat with body cat="${expectedCat}" after category click`,
        timeout: 15000,
        intervals: [500],
      })
      .toBe(true);
    this.page.off('response', onResponse);

    const payload = (await bycatResponse!.json()) as { Items?: Array<{ cat?: string }> };
    const itemCount = payload.Items?.length ?? 0;
    expect(itemCount).toBeGreaterThan(0);
    expect(payload.Items!.every(item => item.cat === expectedCat)).toBe(true);
    return itemCount;
  }

  async clickCategory(category: string): Promise<number> {
    switch (category.toLowerCase()) {
      case 'phones':
        return await this.clickCategoryLink(this.phones, 'phone');
      case 'laptops':
        return await this.clickCategoryLink(this.laptops, 'notebook');
      case 'monitors':
        return await this.clickCategoryLink(this.monitors, 'monitor');
      default:
        throw new Error(`Unknown category: ${category}`);
    }
  }
}
