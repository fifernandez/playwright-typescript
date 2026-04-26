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
  - text:            
  - navigation [ref=e2]:
    - button "Toggle navigation" [ref=e3]
    - link "PRODUCT STORE" [ref=e5]:
      - /url: index.html
      - img [ref=e6]
      - text: PRODUCT STORE
    - list [ref=e8]:
      - listitem [ref=e9]:
        - link "Home (current)" [ref=e10]:
          - /url: index.html
          - text: Home
          - generic [ref=e11]: (current)
      - listitem [ref=e12]:
        - link "Contact" [ref=e13]:
          - /url: "#"
      - listitem [ref=e14]:
        - link "About us" [ref=e15]:
          - /url: "#"
      - listitem [ref=e16]:
        - link "Cart" [ref=e17]:
          - /url: cart.html
      - listitem [ref=e18]:
        - link "Log in" [ref=e19]:
          - /url: "#"
      - listitem
      - listitem
      - listitem [ref=e20]:
        - link "Sign up" [ref=e21]:
          - /url: "#"
  - generic [ref=e23]:
    - generic [ref=e25]:
      - link "CATEGORIES" [ref=e26]:
        - /url: ""
      - link "Phones" [ref=e27]:
        - /url: "#"
      - link "Laptops" [ref=e28]:
        - /url: "#"
      - link "Monitors" [ref=e29]:
        - /url: "#"
    - list [ref=e32]:
      - listitem [ref=e33]:
        - button "Previous" [ref=e34]
      - listitem [ref=e35]:
        - button "Next" [ref=e36] [cursor=pointer]
  - generic [ref=e38]:
    - generic [ref=e41]:
      - heading "About Us" [level=4] [ref=e42]
      - paragraph [ref=e43]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e46]:
      - heading "Get in Touch" [level=4] [ref=e47]
      - paragraph [ref=e48]: "Address: 2390 El Camino Real"
      - paragraph [ref=e49]: "Phone: +440 123456"
      - paragraph [ref=e50]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e54]:
      - img [ref=e55]
      - text: PRODUCT STORE
  - contentinfo [ref=e56]:
    - paragraph [ref=e57]: Copyright © Product Store
```

# Test source

```ts
  1  | import dotenv from 'dotenv';
  2  | import { existsSync } from 'fs';
  3  | 
  4  | import type { TestAccount, TestAccountRecord, TestEnvironmentName } from '../src/types/testAccount';
  5  | import userAccountsJson from '../utils/user.json' with { type: 'json' };
  6  | 
  7  | dotenv.config({
  8  |   path: `./config/.env.${process.env.env_name}`,
  9  |   override: false,
  10 |   quiet: true,
  11 | });
  12 | 
  13 | const envName = process.env.env_name;
  14 | if (envName === 'qa' || envName === 'prod') {
  15 |   const envSpecificPath = `./config/.env.${envName}`;
  16 |   if (existsSync(envSpecificPath)) {
  17 |     dotenv.config({ path: envSpecificPath, override: true, quiet: true });
  18 |   }
  19 | }
  20 | 
  21 | const userAccounts = userAccountsJson as TestAccountRecord[];
  22 | 
  23 | export default class Global {
  24 |   private static frontEndBaseUrls = new Map([
  25 |     ['qa', 'https://www.demoblaze.com/'],
  26 |     ['prod', 'https://www.demoblaze.com/'],
  27 |   ]);
  28 | 
  29 |   private static backendEndBaseUrls = new Map([
  30 |     ['qa', 'https://jsonplaceholder.typicode.com/'],
  31 |     ['prod', 'https://jsonplaceholder.typicode.com/'],
  32 |   ]);
  33 | 
  34 |   //Environment
  35 |   public static ENV_NAME = process.env.env_name ? process.env.env_name : 'error';
  36 |   public static FRONTEND_BASE_URL = this.frontEndBaseUrls.get(this.ENV_NAME);
  37 |   public static BACKEND_BASE_URL = this.backendEndBaseUrls.get(this.ENV_NAME);
  38 | 
  39 |   //Project
  40 |   public static GLOBAL_TIMEOUT = process.env.globalTimeout ? parseInt(process.env.globalTimeout) : 3600000;
  41 |   public static TIMEOUT = process.env.timeout ? parseInt(process.env.timeout) : 60000;
  42 |   public static EXPECT_TIMEOUT = process.env.expectTimeout ? parseInt(process.env.expectTimeout) : 10000;
  43 |   public static TRACE = process.env.trace
  44 |     ? (process.env.trace as 'on' | 'off' | 'retain-on-failure' | 'on-first-retry' | 'retry-with-trace')
  45 |     : 'off';
  46 |   public static RETRIES = process.env.retries ? parseInt(process.env.retries) : 1;
  47 |   public static RUN_IN_PARALLEL = process.env.runInParallel === 'true';
  48 |   public static WORKERS = process.env.workers ? parseInt(process.env.workers) : 1;
  49 |   public static SCREENSHOT = process.env.screenshot
  50 |     ? (process.env.screenshot as 'off' | 'on' | 'only-on-failure' | 'on-first-failure')
  51 |     : 'off';
  52 |   public static VIDEO = process.env.video
  53 |     ? (process.env.video as 'off' | 'on' | 'retain-on-failure' | 'on-first-retry')
  54 |     : 'off';
  55 | 
  56 |   //Users accounts
  57 |   public static getUserAccount(accountName: string): TestAccount {
  58 |     const envName = this.ENV_NAME;
  59 |     const record = userAccounts.find(a => a.accountName === accountName);
  60 |     if (!record) {
  61 |       throw new Error(`No user account "${accountName}" in utils/user.json`);
  62 |     }
  63 |     const creds = record[envName as TestEnvironmentName];
  64 |     const password = process.env[accountName];
  65 |     if (!password) {
> 66 |       throw new Error(
     |             ^ Error: Missing password for account first-account. Set password in config/.env or config/.env.prod
  67 |         `Missing password for account ${accountName}. Set password in config/.env or config/.env.${envName}`,
  68 |       );
  69 |     }
  70 |     return {
  71 |       username: creds.username,
  72 |       email: creds.email,
  73 |       password,
  74 |     };
  75 |   }
  76 | }
  77 | 
```