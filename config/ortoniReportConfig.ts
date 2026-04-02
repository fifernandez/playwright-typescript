import { OrtoniReportConfig } from 'ortoni-report';

const ortoniReportConfig: OrtoniReportConfig = {
  open: process.env.CI ? 'never' : 'never',
  folderPath: 'out/reports/ortoni',
  filename: 'index.html',
  title: 'Automation Report',
  projectName: 'fifernandez - Playwright Typescript Automation',
  testType: 'Tests',
  authorName: 'Fran Fernandez',
  base64Image: false,
  stdIO: false,
};

export default ortoniReportConfig;
