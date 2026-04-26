import { defineConfig, devices } from '@playwright/test';

import allureConfig from './config/allureConfig';
import ortoniReportConfig from './config/ortoniReportConfig';
import Global from './helpers/global';
import { DataHelper } from './utils/dates';

export default defineConfig({
  outputDir: 'out/results/playwright',
  globalTimeout: Global.GLOBAL_TIMEOUT,
  timeout: Global.TIMEOUT,
  expect: {
    timeout: Global.EXPECT_TIMEOUT,
  },
  retries: process.env.CI ? Global.RETRIES : Global.RETRIES,
  fullyParallel: Global.RUN_IN_PARALLEL,
  workers: process.env.CI ? Global.WORKERS : Global.WORKERS,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'out/reports/playwright' }],
    ['json', { outputFile: 'out/reports/jsonReport.json' }],
    ['junit', { outputFile: 'out/reports/junitReport.xml' }],
    ['allure-playwright', allureConfig],
    ['ortoni-report', ortoniReportConfig],
    [
      'blob',
      {
        outputFile: `out/reports/blob-report/report-${DataHelper.getUniqueDateWithTime()}.zip`,
      },
    ],
  ],
  use: {
    baseURL: Global.FRONTEND_BASE_URL,
    trace: Global.TRACE,
    screenshot: Global.SCREENSHOT,
    video: {
      mode: Global.VIDEO,
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
      },
      grep: [/@tablet/, /@mobile/],
    },
    {
      name: 'backend',
      grep: [/@backend/],
    },
  ],
});
