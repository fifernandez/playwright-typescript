import { Page } from '@playwright/test';
import { HomePage } from './homePage';
import { LoginPage } from './loginPage';

export class PageManager {
  private readonly page: Page;
  readonly homePage: HomePage;
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.loginPage = new LoginPage(this.page);
  }
}
