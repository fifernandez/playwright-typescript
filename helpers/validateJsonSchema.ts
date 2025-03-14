/* eslint-disable @typescript-eslint/no-require-imports */
import { expect } from '@playwright/test';
import Ajv from 'ajv';

/**
 * Validates an object against a JSON schema.
 *
 * @param {string} schemaName - The first part of the name of the JSON schema file. The full name will be `${schemaName}.json`.
 * @param {object} body - The object to validate against the JSON schema.
 *
 * @example
 *
 *    await validateJsonSchema("users", body);
 */
export async function validateJsonSchema(schemaName: string, body: object) {
  const schemaFile = require(`../schemas/${schemaName}.json`);
  const ajv = new Ajv({ allErrors: false });
  const validate = ajv.compile(schemaFile);
  validate(body);
  const schemaValidationErrors = validate.errors;
  expect(schemaValidationErrors, `Verify schema ${schemaName} is correct for the response body.`).toBeNull();
}
