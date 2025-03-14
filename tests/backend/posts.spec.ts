import { test, expect } from '@playwright/test';
import GlobalVars from '../../helpers/globalVars';
import { validateJsonSchema } from '../../helpers/validateJsonSchema';

test.describe('Posts endpoint', { tag: ['@backend'] }, () => {
  const postsPath = `${GlobalVars.BACKEND_BASE_URL}posts`;

  test('Verify Posts endpoint is returning a correct 200 response', { tag: ['@Smoke'] }, async ({ request }) => {
    const response = await test.step('Do a GET to the Posts endpoint', async () => {
      return await request.get(postsPath);
    });
    const responseBody = await response.json();
    expect(response.status(), 'Verify response status is 200.').toEqual(200);
    await validateJsonSchema('posts-200', responseBody);
  });

  test('Verify Post endpoint amount of returned items is 100', { tag: ['@Regression'] }, async ({ request }) => {
    const response = await test.step('Do a GET to the Posts endpoint', async () => {
      return await request.get(postsPath);
    });
    const responseBody = await response.json();
    expect(responseBody.length, 'Verify the amount of returned items is 100').toEqual(100);
  });
});
