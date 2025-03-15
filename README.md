# playwright-typescript

This is a [Playwright](https://playwright.dev/) project for runing End-To-End automated test. With this, you can do frontend and backend test, or a mix of both.

| Job        | Status  | Reports |
| ---------- | ------- | ------- |
| Smoke      | [![Smoke Tests](https://github.com/fifernandez/playwright-typescript/actions/workflows/smoke-tests.yml/badge.svg)](https://github.com/fifernandez/playwright-typescript/actions/workflows/smoke-tests.yml)                | [<img src="https://avatars.githubusercontent.com/u/5879127?s=200&v=4" width="25" alt="Allure Report"/>](https://fifernandez.github.io/playwright-typescript/allure/smoke) [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/playwright/playwright-original.svg" width="25" alt="Playwright Report"/>](https://fifernandez.github.io/playwright-typescript/playwright/smoke) [<img src="https://cdn-icons-png.freepik.com/256/17258/17258058.png?semt=ais_hybrid" width="25" alt="Ortoni Report"/>](https://fifernandez.github.io/playwright-typescript/ortoni/smoke)            |
| Regression | [![Regression Tests](https://github.com/fifernandez/playwright-typescript/actions/workflows/regression-tests.yml/badge.svg)](https://github.com/fifernandez/playwright-typescript/actions/workflows/regression-tests.yml) | [<img src="https://avatars.githubusercontent.com/u/5879127?s=200&v=4" width="25" alt="Allure Report"/>](https://fifernandez.github.io/playwright-typescript/allure/regression) [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/playwright/playwright-original.svg" width="25" alt="Playwright Report"/>](https://fifernandez.github.io/playwright-typescript/allure/regression) [<img src="https://cdn-icons-png.freepik.com/256/17258/17258058.png?semt=ais_hybrid" width="25" alt="Ortoni Report"/>](https://fifernandez.github.io/playwright-typescript/allure/regression) |

- For UI tests is using: [demoblaze](https://www.demoblaze.com/)
- For backend tests is using: [jsonplaceholder](https://jsonplaceholder.typicode.com/)

## Features:

## Pre-Requisites:

### For Beginners:

```bash
#1 - Clone the repo or manually download it.
#2 - Open a console inside the repo folder
#3 - Make sure you have Node correctly installed. If it is this command should display your node version:
node -v
#3 - Install project dependencies:
npm install
#4 - Install Playwright:
npx playwright install --with-deps
#5 - Run the tests:
npx playwright test --project=chrome --headed
#6 - Open the report:
npx playwright show-report
```

### For developers:

## Intalation

```bash
npm install
npx playwright install --with-deps
```

## Runing the tests:

This command will run all the test for all the available browsers in headless mode.

```bash
npm run test
# or
npx playwright test
```

## Parameters:

If you don't want to run the scripts and want something more specific use the next parameters.

### Configuration File:

The file is under: 'config/.env'.
This is where you must select the configurarion for you environment, xray reporting or add test accounts if needed.
For better secutiry is not allowed to storage and commit secret values. You can add the variables but do not commit the values.

### - Environment:

Use it to select in which environment you want to test.
Available: qa, prod.
Default: prod

On the configuration file fill the value for 'env_name' with one of the available ones.

### - Browsers:

You can specify the browser you want to run.
Available: chrome, firefox, safari, edge, backend.
Default: when empty it will run for all.
Note: When choosing backend it will run only backend tests, when choosing any of the browsers only frontend tests will be run.

```bash
    npx playwright test --project=chrome
```

By default browser will be headless and will run in the background. If you want to see it:

```bash
    npx playwright test --project=chrome --headed
```

### - Tests Tags:

You can choose which test you want to run using test tags. Like:

```bash
    npx playwright test --grep @Smoke
```

You can also use operators like:

```bash
    npx playwright test --grep '@Smoke | @Regression'
```

### - Running test in Parallel:

By default test will run sequentially, one after another. To speed things up, you can run test in parallel, so many browsers will open up and run each test. To do it, just change in the configuration file:
`         runInParallel=true
    `

## Reports:

For seeing reports, after test execution run this commands.

- Playwright:

  ```bash
  npx playwright show-report
  ```

- Allure:

  ```bash
  npm run allureReport
  ```

- Ortoni:
  Under: ortoni-report/index.html

- Json and XML Junit:
  Files are saved under /test-results after tests execution.

## Learn More

- [Playwright](https://playwright.dev/) - to learn about Playright framework.
