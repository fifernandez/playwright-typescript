import { Page } from '@playwright/test';

import { HomePage } from './homePage';

export class PageManager {
  private readonly page: Page;
  readonly homePage: HomePage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(this.page);
  }
}
