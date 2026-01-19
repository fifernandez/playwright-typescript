import { defineConfig, devices } from '@playwright/test';
import GlobalVars from './helpers/globalVars';
import allureConfig from './config/allureConfig';

export default defineConfig({
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: GlobalVars.RUN_IN_PARALLEL,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 2,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/jsonReport.json' }],
    ['junit', { outputFile: 'test-results/jsonReport.xml' }],
    ['allure-playwright', allureConfig],
  ],
  use: {
    baseURL: GlobalVars.FRONTEND_BASE_URL,
    trace: 'off',
    screenshot: 'only-on-failure',
    video: {
      mode: 'on',
    },
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
      grep: [/@desktop/],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
      grep: [/@desktop/],
    },
    {
      name: 'safari',
      use: {
        ...devices['Desktop Safari'],
      },
      grep: [/@desktop/],
    },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
      },
      grep: [/@desktop/],
    },
    {
      name: 'phone',
      use: {
        ...devices['iPhone 14'],
      },
      grep: [/@phone/, /@mobile/],
    },
    {
      name: 'tablet',
      use: {
        ...devices['Galaxy Tab S4'],
        viewport: { width: 770, height: 900 },
      },
      grep: [/@tablet/, /@mobile/],
    },
    {
      name: 'backend',
      grep: [/@backend/],
    },
  ],
});
