/** @type {import('@allurereport/plugin-api').Config} */
export default {
  name: 'Playwright Report',
  output: './out/reports/allure',
  historyPath: './out/results/allure-history.jsonl',
  historyLimit: 20,
  categories: {
    rules: [
      {
        id: 'foo',
        name: 'foo',
        matchers: {
          message: 'bar',
          trace: 'baz',
          statuses: ['failed', 'broken'],
        },
      },
    ],
  },
  plugins: {
    // Prevent the default agent plugin from writing a second output folder.
    // Multiple plugin folders block Allure from hoisting the Awesome report
    // to the output root, which hides history/retries/trends.
    agent: {
      enabled: false,
    },
    awesome: {
      options: {
        reportLanguage: 'en',
        groupBy: ['parentSuite', 'suite', 'subSuite'],
      },
    },
  },
};
