import { faker } from '@faker-js/faker';
import { APIResponse, expect, test } from '@playwright/test';

import { Paths } from '../../src/api/routes/posts';
import { validateJsonSchema } from '../../utils/validateJsonSchema';

test.describe('Posts endpoint', { tag: ['@backend'] }, () => {
  const postsPath = Paths.posts;

  test(
    'ID-100 | Verify Posts endpoint is returning a correct 200 response',
    { tag: ['@smoke'] },
    async ({ request }) => {
      let response: APIResponse;

      await test.step('1. Do a GET to the Posts endpoint', async () => {
        response = await request.get(postsPath);
      });

      await test.step('2. Verify response status is 200', async () => {
        expect(response.status(), 'Verify response status is 200.').toEqual(200);
      });

      await test.step('3. Validate response body', async () => {
        const responseBody = await response.json();
        await validateJsonSchema('posts-200', responseBody);
      });
    },
  );

  test(
    'ID-101 | Verify Post endpoint amount of returned items is 100',
    { tag: ['@regression'] },
    async ({ request }) => {
      let response: APIResponse;

      await test.step('1. Do a GET to the Posts endpoint', async () => {
        response = await request.get(postsPath);
      });

      await test.step('2. Verify response status is 200', async () => {
        expect(response.status(), 'Verify response status is 200.').toEqual(200);
      });

      await test.step('3. Validate response body', async () => {
        const responseBody = await response.json();
        expect(responseBody, 'Verify the amount of returned items is 100').toHaveLength(100);
      });
    },
  );

  test(
    'ID-102 | Verify Posts endpoint is returning a correct 200 response for a specific post',
    { tag: ['@regression'] },
    async ({ request }) => {
      let response: APIResponse;

      await test.step('1. Do a GET to the Posts endpoint for a specific post', async () => {
        const randomPostId = faker.number.int({ min: 1, max: 100 });
        response = await request.get(`${postsPath}/${randomPostId}`);
      });

      await test.step('2. Verify response status is 200', async () => {
        expect(response.status(), 'Verify response status is 200.').toEqual(200);
      });
    },
  );
});
