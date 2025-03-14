import { Status } from 'allure-js-commons';
import * as os from 'node:os';

const allureConfig = {
  resultsDir: 'allure-results',
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
  categories: [
    {
      name: 'foo',
      messageRegex: 'bar',
      traceRegex: 'baz',
      matchedStatuses: [Status.FAILED, Status.BROKEN],
    },
  ],
  environmentInfo: {
    os_platform: os.platform(),
    os_release: os.release(),
    os_version: os.version(),
    node_version: process.version,
  },
};

export default allureConfig;
