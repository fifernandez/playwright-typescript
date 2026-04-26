import { faker } from '@faker-js/faker';
import { APIResponse, expect, test } from '@playwright/test';

import { Paths } from '../../src/api/routes/users';
import { validateJsonSchema } from '../../utils/validateJsonSchema';

test.describe('Users endpoint', { tag: ['@backend'] }, () => {
  const usersPath = Paths.users;

  test(
    'ID-130 | Verify Users endpoint is returning a correct 200 response',
    { tag: ['@smoke'] },
    async ({ request }) => {
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
    },
  );

  test(
    'ID-131 | Verify Users endpoint amount of returned items is 10',
    { tag: ['@regression'] },
    async ({ request }) => {
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
    },
  );

  test(
    'ID-132 | Verify Users endpoint is returning a correct 200 response for a specific user',
    { tag: ['@regression'] },
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
