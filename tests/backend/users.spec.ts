import { test, expect } from '@playwright/test';
import GlobalVars from '../../helpers/globalVars';
import { validateJsonSchema } from '../../helpers/validateJsonSchema';

test.describe('Users endpoint', { tag: ['@backend'] }, () => {
  const usersPath = `${GlobalVars.BACKEND_BASE_URL}users`;

  test('Verify Users endpoint is returning a correct 200 response', { tag: ['@Smoke'] }, async ({ request }) => {
    const response = await test.step('Do a GET to the Users endpoint', async () => {
      return await request.get(usersPath);
    });
    const responseBody = await response.json();
    expect(response.status(), 'Verify response status is 200.').toEqual(200);
    await validateJsonSchema('users-200', responseBody);
  });

  test('Verify Users endpoint amount of returned items is 10', { tag: ['@Regression'] }, async ({ request }) => {
    const response = await test.step('Do a GET to the Users endpoint', async () => {
      return await request.get(usersPath);
    });
    const responseBody = await response.json();
    expect(responseBody.length, 'Verify the amount of returned items is 10').toEqual(10);
  });
});
