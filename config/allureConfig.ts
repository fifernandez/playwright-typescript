import * as os from 'node:os';

const allureConfig = {
  resultsDir: 'out/results/allure',
  detail: true,
  suiteTitle: true,
  links: {
    issue: {
      nameTemplate: 'Issue #%s',
      urlTemplate: 'https://issues.example.com/%s',
    },
    tms: {
      nameTemplate: 'TMS #%s',
      urlTemplate: 'https://tms.example.com/%s',
    },
    jira: {
      urlTemplate: (v: string) => `https://jira.example.com/browse/${v}`,
    },
  },
  environmentInfo: {
    os_platform: os.platform(),
    os_release: os.release(),
    os_version: os.version(),
    node_version: process.version,
  },
};

export default allureConfig;
