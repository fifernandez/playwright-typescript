import { Page } from '@playwright/test';

import { Base } from '../base';

export class BasePage extends Base {
  constructor(page: Page) {
    super(page);
  }
}
