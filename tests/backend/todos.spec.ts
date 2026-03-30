import { faker } from '@faker-js/faker';
import { APIResponse, expect, test } from '@playwright/test';

import GlobalVars from '../../helpers/globalVars';
import { validateJsonSchema } from '../../helpers/validateJsonSchema';

test.describe('Todos endpoint', { tag: ['@backend'] }, () => {
  const todosPath = `${GlobalVars.BACKEND_BASE_URL}todos`;

  test('Verify Todos endpoint is returning a correct 200 response', { tag: ['@Smoke'] }, async ({ request }) => {
    let response: APIResponse;

    await test.step('1. Do a GET to the Todos endpoint', async () => {
      response = await request.get(todosPath);
    });

    await test.step('2. Verify response status is 200', async () => {
      expect(response.status(), 'Verify response status is 200.').toEqual(200);
    });

    await test.step('3. Validate response body', async () => {
      const responseBody = await response.json();
      await validateJsonSchema('todos-200', responseBody);
    });
  });

  test('Verify Todos endpoint amount of returned items is 200', { tag: ['@Regression'] }, async ({ request }) => {
    let response: APIResponse;

    await test.step('1. Do a GET to the Todos endpoint', async () => {
      response = await request.get(todosPath);
    });

    await test.step('2. Verify response status is 200', async () => {
      expect(response.status(), 'Verify response status is 200.').toEqual(200);
    });

    await test.step('3. Validate response body', async () => {
      const responseBody = await response.json();
      expect(responseBody, 'Verify the amount of returned items is 200').toHaveLength(200);
    });
  });

  test(
    'Verify Todos endpoint is returning a correct 200 response for a specific todo',
    { tag: ['@Regression'] },
    async ({ request }) => {
      let response: APIResponse;

      await test.step('1. Do a GET to the Todos endpoint for a specific todo', async () => {
        const randomTodoId = faker.number.int({ min: 1, max: 200 });
        response = await request.get(`${todosPath}/${randomTodoId}`);
      });

      await test.step('2. Verify response status is 200', async () => {
        expect(response.status(), 'Verify response status is 200.').toEqual(200);
      });
    },
  );
});
