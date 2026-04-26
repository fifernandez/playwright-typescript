# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/frontend/login.spec.ts >> ID-002 | Verify successful login
- Location: tests/frontend/login.spec.ts:6:1

# Error details

```
Error: Missing password for account first-account. Set password in config/.env or config/.env.prod
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - text:             
  - navigation [ref=e2]:
    - link "PRODUCT STORE" [ref=e3] [cursor=pointer]:
      - /url: index.html
      - img [ref=e4]
      - text: PRODUCT STORE
    - list [ref=e6]:
      - listitem [ref=e7]:
        - link "Home (current)" [ref=e8] [cursor=pointer]:
          - /url: index.html
          - text: Home
          - generic [ref=e9]: (current)
      - listitem [ref=e10]:
        - link "Contact" [ref=e11] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e12]:
        - link "About us" [ref=e13] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e14]:
        - link "Cart" [ref=e15] [cursor=pointer]:
          - /url: cart.html
      - listitem [ref=e16]:
        - link "Log in" [ref=e17] [cursor=pointer]:
          - /url: "#"
      - listitem
      - listitem
      - listitem [ref=e18]:
        - link "Sign up" [ref=e19] [cursor=pointer]:
          - /url: "#"
    - generic [ref=e21]:
      - list [ref=e22]:
        - listitem [ref=e23] [cursor=pointer]
        - listitem [ref=e24] [cursor=pointer]
        - listitem [ref=e25] [cursor=pointer]
      - img "First slide" [ref=e28]
      - button "Previous" [ref=e29] [cursor=pointer]:
        - generic [ref=e31]: Previous
      - button "Next" [ref=e32] [cursor=pointer]:
        - generic [ref=e34]: Next
  - generic [ref=e36]:
    - generic [ref=e38]:
      - link "CATEGORIES" [ref=e39] [cursor=pointer]:
        - /url: ""
      - link "Phones" [ref=e40] [cursor=pointer]:
        - /url: "#"
      - link "Laptops" [ref=e41] [cursor=pointer]:
        - /url: "#"
      - link "Monitors" [ref=e42] [cursor=pointer]:
        - /url: "#"
    - list [ref=e45]:
      - listitem [ref=e46]:
        - button "Previous" [ref=e47]
      - listitem [ref=e48]:
        - button "Next" [ref=e49] [cursor=pointer]
  - generic [ref=e51]:
    - generic [ref=e54]:
      - heading "About Us" [level=4] [ref=e55]
      - paragraph [ref=e56]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e59]:
      - heading "Get in Touch" [level=4] [ref=e60]
      - paragraph [ref=e61]: "Address: 2390 El Camino Real"
      - paragraph [ref=e62]: "Phone: +440 123456"
      - paragraph [ref=e63]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e67]:
      - img [ref=e68]
      - text: PRODUCT STORE
  - contentinfo [ref=e69]:
    - paragraph [ref=e70]: Copyright © Product Store
```

# Test source

```ts
  1  | import dotenv from 'dotenv';
  2  | import { existsSync } from 'fs';
  3  | import path from 'node:path';
  4  | 
  5  | import type { TestAccount, TestAccountRecord, TestEnvironmentName } from '../src/types/testAccount';
  6  | import userAccountsJson from '../utils/user.json' with { type: 'json' };
  7  | 
  8  | const configDir = path.join(process.cwd(), 'config');
  9  | const baseEnvFile = path.join(configDir, '.env');
  10 | 
  11 | if (!process.env.env_name && existsSync(baseEnvFile)) {
  12 |   dotenv.config({ path: baseEnvFile, override: false, quiet: true });
  13 | }
  14 | 
  15 | // Lock in the target environment before loading the second file. config/.env.qa (or .prod) often
  16 | // also contains an env_name= line; with override: true that would clobber a choice of qa from
  17 | // config/.env or the shell, so we restore the chosen name after the load.
  18 | const selectedEnv = process.env.env_name;
  19 | if (selectedEnv === 'qa' || selectedEnv === 'prod') {
  20 |   const envFile = path.join(configDir, `.env.${selectedEnv}`);
  21 |   if (existsSync(envFile)) {
  22 |     dotenv.config({ path: envFile, override: true, quiet: true });
  23 |   }
  24 | } else if (selectedEnv) {
  25 |   const envFile = path.join(configDir, `.env.${selectedEnv}`);
  26 |   if (existsSync(envFile)) {
  27 |     dotenv.config({ path: envFile, override: true, quiet: true });
  28 |   }
  29 | }
  30 | if (selectedEnv) {
  31 |   process.env.env_name = selectedEnv;
  32 | }
  33 | 
  34 | const userAccounts = userAccountsJson as TestAccountRecord[];
  35 | 
  36 | export default class Global {
  37 |   private static frontEndBaseUrls = new Map([
  38 |     ['qa', 'https://www.demoblaze.com/'],
  39 |     ['prod', 'https://www.demoblaze.com/'],
  40 |   ]);
  41 | 
  42 |   private static backendEndBaseUrls = new Map([
  43 |     ['qa', 'https://jsonplaceholder.typicode.com/'],
  44 |     ['prod', 'https://jsonplaceholder.typicode.com/'],
  45 |   ]);
  46 | 
  47 |   //Environment
  48 |   public static ENV_NAME = process.env.env_name ? process.env.env_name : 'error';
  49 |   public static FRONTEND_BASE_URL = this.frontEndBaseUrls.get(this.ENV_NAME);
  50 |   public static BACKEND_BASE_URL = this.backendEndBaseUrls.get(this.ENV_NAME);
  51 | 
  52 |   //Project
  53 |   public static GLOBAL_TIMEOUT = process.env.globalTimeout ? parseInt(process.env.globalTimeout) : 3600000;
  54 |   public static TIMEOUT = process.env.timeout ? parseInt(process.env.timeout) : 60000;
  55 |   public static EXPECT_TIMEOUT = process.env.expectTimeout ? parseInt(process.env.expectTimeout) : 10000;
  56 |   public static TRACE = process.env.trace
  57 |     ? (process.env.trace as 'on' | 'off' | 'retain-on-failure' | 'on-first-retry' | 'retry-with-trace')
  58 |     : 'off';
  59 |   public static RETRIES = process.env.retries ? parseInt(process.env.retries) : 1;
  60 |   public static RUN_IN_PARALLEL = process.env.runInParallel === 'true';
  61 |   public static WORKERS = process.env.workers ? parseInt(process.env.workers) : 1;
  62 |   public static SCREENSHOT = process.env.screenshot
  63 |     ? (process.env.screenshot as 'off' | 'on' | 'only-on-failure' | 'on-first-failure')
  64 |     : 'off';
  65 |   public static VIDEO = process.env.video
  66 |     ? (process.env.video as 'off' | 'on' | 'retain-on-failure' | 'on-first-retry')
  67 |     : 'off';
  68 | 
  69 |   //Users accounts
  70 |   public static getUserAccount(accountName: string): TestAccount {
  71 |     const envName = this.ENV_NAME;
  72 |     const record = userAccounts.find(a => a.accountName === accountName);
  73 |     if (!record) {
  74 |       throw new Error(`No user account "${accountName}" in utils/user.json`);
  75 |     }
  76 |     const creds = record[envName as TestEnvironmentName];
  77 |     const password = process.env[accountName];
  78 |     if (!password) {
> 79 |       throw new Error(
     |             ^ Error: Missing password for account first-account. Set password in config/.env or config/.env.prod
  80 |         `Missing password for account ${accountName}. Set password in config/.env or config/.env.${envName}`,
  81 |       );
  82 |     }
  83 |     return {
  84 |       username: creds.username,
  85 |       email: creds.email,
  86 |       password,
  87 |     };
  88 |   }
  89 | }
  90 | 
```