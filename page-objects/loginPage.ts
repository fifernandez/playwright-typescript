import { Locator, Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class LoginPage extends HelperBase {
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
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
