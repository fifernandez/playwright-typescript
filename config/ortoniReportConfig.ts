import { OrtoniReportConfig } from 'ortoni-report';

const ortoniReportConfig: OrtoniReportConfig = {
  open: process.env.CI ? 'never' : 'never',
  folderPath: 'ortoni-report',
  filename: 'index.html',
  title: 'Automation Report',
  showProject: !true,
  projectName: 'playwright-typescript-automation',
  testType: 'Regression',
  authorName: 'fifernandez',
  base64Image: false,
  stdIO: false,
  preferredTheme: 'light',
};

export default ortoniReportConfig;
