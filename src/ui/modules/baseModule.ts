import { Page } from '@playwright/test';

import { Base } from '../base';

export class BaseModule extends Base {
  constructor(page: Page) {
    super(page);
  }
}
