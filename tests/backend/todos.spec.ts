import { test, expect } from '@playwright/test';
import GlobalVars from '../../helpers/globalVars';
import { validateJsonSchema } from '../../helpers/validateJsonSchema';

test.describe('Todos endpoint', { tag: ['@backend'] }, () => {
  const todosPath = `${GlobalVars.BACKEND_BASE_URL}todos`;

  test('Verify Todos endpoint is returning a correct 200 response', { tag: ['@Smoke'] }, async ({ request }) => {
    const response = await test.step('Do a GET to the Todos endpoint', async () => {
      return await request.get(todosPath);
    });
    const responseBody = await response.json();
    expect(response.status(), 'Verify response status is 200.').toEqual(200);
    await validateJsonSchema('todos-200', responseBody);
  });

  test('Verify Todos endpoint amount of returned items is 200', { tag: ['@Regression'] }, async ({ request }) => {
    const response = await test.step('Do a GET to the Todos endpoint', async () => {
      return await request.get(todosPath);
    });
    const responseBody = await response.json();
    expect(responseBody.length, 'Verify the amount of returned items is 200').toEqual(200);
  });
});
