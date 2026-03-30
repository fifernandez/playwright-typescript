import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import playwright from 'eslint-plugin-playwright';

const { configs: typescriptConfigs } = typescript;

export default [
  prettierConfig,
  {
    ignores: ['node_modules/**', 'playwright.config.ts', '.*/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescript,
      playwright: playwright,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: true,
      },
    },
    rules: {
      ...typescriptConfigs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      '@typescript-eslint/no-floating-promises': 'error',
      'no-console': 'off',
      'playwright/no-conditional-in-test': 'off',
      'playwright/no-conditional-expect': 'off',
      'playwright/no-skipped-test': ['error', { allowConditional: true }],
      'playwright/expect-expect': [
        'error',
        {
          assertFunctionNames: ['somethingInTheFuture'],
        },
      ],
    },
    ignores: ['node_modules/**', 'playwright.config.ts', '.cursor/**'],
  },
];
