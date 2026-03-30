import { expect } from '@playwright/test';
import Ajv from 'ajv';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Validates an object against a JSON schema.
 *
 * @param {string} schemaName - The first part of the name of the JSON schema file. The full name will be `${schemaName}.json`.
 * @param {object} body - The object to validate against the JSON schema.
 * @param {object} options - Optional. Set { hard: false } to use expect.soft() so the test continues on failure.
 *
 * @example
 *
 *    await validateJsonSchema("users", body);
 */
export async function validateJsonSchema(schemaName: string, body: object, options?: { hard?: boolean }) {
  const schemaPath = join(process.cwd(), 'schemas', `${schemaName}.json`);
  const schemaFile = JSON.parse(readFileSync(schemaPath, 'utf-8')) as object;
  const ajv = new Ajv({ allErrors: false });
  const validate = ajv.compile(schemaFile);
  validate(body);
  const schemaValidationErrors = validate.errors;
  const assertion = options?.hard === false ? expect.soft : expect;
  assertion(schemaValidationErrors, `Verify schema ${schemaName} is correct for the response body.`).toBeNull();
}
