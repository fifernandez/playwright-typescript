import { faker } from '@faker-js/faker';
import { APIResponse, expect, test } from '@playwright/test';

import GlobalVars from '../../helpers/globalVars';
import { validateJsonSchema } from '../../helpers/validateJsonSchema';

test.describe('Users endpoint', { tag: ['@backend'] }, () => {
  const usersPath = `${GlobalVars.BACKEND_BASE_URL}users`;

  test('Verify Users endpoint is returning a correct 200 response', { tag: ['@Smoke'] }, async ({ request }) => {
    let response: APIResponse;

    await test.step('1. Do a GET to the Users endpoint', async () => {
      response = await request.get(usersPath);
    });

    await test.step('2. Verify response status is 200', async () => {
      expect(response.status(), 'Verify response status is 200.').toEqual(200);
    });

    await test.step('3. Validate response body', async () => {
      const responseBody = await response.json();
      await validateJsonSchema('users-200', responseBody);
    });
  });

  test('Verify Users endpoint amount of returned items is 10', { tag: ['@Regression'] }, async ({ request }) => {
    let response: APIResponse;

    await test.step('1. Do a GET to the Users endpoint', async () => {
      response = await request.get(usersPath);
    });

    await test.step('2. Verify response status is 200', async () => {
      expect(response.status(), 'Verify response status is 200.').toEqual(200);
    });

    await test.step('3. Validate response body', async () => {
      const responseBody = await response.json();
      expect(responseBody, 'Verify the amount of returned items is 10').toHaveLength(10);
    });
  });

  test(
    'Verify Users endpoint is returning a correct 200 response for a specific user',
    { tag: ['@Regression'] },
    async ({ request }) => {
      let response: APIResponse;

      await test.step('1. Do a GET to the Users endpoint for a specific user', async () => {
        const randomUserId = faker.number.int({ min: 1, max: 10 });
        response = await request.get(`${usersPath}/${randomUserId}`);
      });

      await test.step('2. Verify response status is 200', async () => {
        expect(response.status(), 'Verify response status is 200.').toEqual(200);
      });
    },
  );
});
