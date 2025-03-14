import typescript from '@typescript-eslint/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import typescriptParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
const { configs: typescriptConfigs } = typescript;

export default [
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
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...typescriptConfigs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      'no-console': 'warn',
      'playwright/no-skipped-test': ['error', { allowConditional: true }],
      'playwright/expect-expect': [
        'error',
        {
          assertFunctionNames: [],
        },
      ],
    },
  },
];
