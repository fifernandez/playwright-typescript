import { Locator, Page, expect } from '@playwright/test';

import { BaseModule } from './baseModule';

export class LoginModule extends BaseModule {
  readonly modalTitle: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly close: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.modalTitle = this.page.locator('[id="logInModalLabel"]');
    this.username = this.page.locator('input[id="loginusername"]');
    this.password = this.page.locator('input[id="loginpassword"]');
    this.close = this.page.getByRole('button', { name: 'Close' });
    this.loginButton = this.page.getByRole('button', { name: 'Log in' });
  }

  async loginUser(username: string, password: string) {
    await expect(this.modalTitle, 'Verify login dialog title is visible').toBeVisible();
    await expect(this.loginButton, 'Verify login button is visible').toBeVisible();
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
    await expect(this.modalTitle, 'Verify login dialog title is hidden').toBeHidden();
  }
}
