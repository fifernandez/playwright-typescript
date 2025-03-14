import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class HomePage extends HelperBase {
  readonly logo: Locator;
  readonly login: Locator;
  readonly logout: Locator;
  readonly phones: Locator;
  readonly laptops: Locator;
  readonly monitors: Locator;
  readonly cardTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = this.page.locator('[id="nava"]');
    this.login = this.page.locator('a[id="login2"]');
    this.logout = this.page.locator('a[id="logout2"]');
    this.phones = this.page.getByRole('link', { name: 'Phones' });
    this.laptops = this.page.getByRole('link', { name: 'Laptops' });
    this.monitors = this.page.getByRole('link', { name: 'Monitors' });
    this.cardTitle = this.page.locator('h4[class="card-title"]');
  }
}
