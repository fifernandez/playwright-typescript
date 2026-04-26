import { Locator, Page } from '@playwright/test';

import { BaseModule } from './baseModule';

export class NavBarModule extends BaseModule {
  readonly logo: Locator;
  readonly login: Locator;
  readonly logout: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = this.page.locator('[id="nava"]');
    this.login = this.page.locator('a[id="login2"]');
    this.logout = this.page.locator('a[id="logout2"]');
  }
}
