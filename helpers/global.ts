import dotenv from 'dotenv';
import { existsSync } from 'fs';
import path from 'node:path';

import type { TestAccount, TestAccountRecord, TestEnvironmentName } from '../src/types/testAccount';
import userAccountsJson from '../utils/user.json' with { type: 'json' };

const configDir = path.join(process.cwd(), 'config');
const baseEnvFile = path.join(configDir, '.env');

if (!process.env.env_name && existsSync(baseEnvFile)) {
  dotenv.config({ path: baseEnvFile, override: false, quiet: true });
}

// Lock in the target environment before loading the second file. config/.env.qa (or .prod) often
// also contains an env_name= line; with override: true that would clobber a choice of qa from
// config/.env or the shell, so we restore the chosen name after the load.
const selectedEnv = process.env.env_name;
if (selectedEnv === 'qa' || selectedEnv === 'prod') {
  const envFile = path.join(configDir, `.env.${selectedEnv}`);
  if (existsSync(envFile)) {
    dotenv.config({ path: envFile, override: true, quiet: true });
  }
} else if (selectedEnv) {
  const envFile = path.join(configDir, `.env.${selectedEnv}`);
  if (existsSync(envFile)) {
    dotenv.config({ path: envFile, override: true, quiet: true });
  }
}
if (selectedEnv) {
  process.env.env_name = selectedEnv;
}

const userAccounts = userAccountsJson as TestAccountRecord[];

export default class Global {
  private static frontEndBaseUrls = new Map([
    ['qa', 'https://www.demoblaze.com/'],
    ['prod', 'https://www.demoblaze.com/'],
  ]);

  private static backendEndBaseUrls = new Map([
    ['qa', 'https://jsonplaceholder.typicode.com/'],
    ['prod', 'https://jsonplaceholder.typicode.com/'],
  ]);

  //Environment
  public static ENV_NAME = process.env.env_name ? process.env.env_name : 'error';
  public static FRONTEND_BASE_URL = this.frontEndBaseUrls.get(this.ENV_NAME);
  public static BACKEND_BASE_URL = this.backendEndBaseUrls.get(this.ENV_NAME);

  //Project
  public static GLOBAL_TIMEOUT = process.env.globalTimeout ? parseInt(process.env.globalTimeout) : 3600000;
  public static TIMEOUT = process.env.timeout ? parseInt(process.env.timeout) : 60000;
  public static EXPECT_TIMEOUT = process.env.expectTimeout ? parseInt(process.env.expectTimeout) : 10000;
  public static TRACE = process.env.trace
    ? (process.env.trace as 'on' | 'off' | 'retain-on-failure' | 'on-first-retry' | 'retry-with-trace')
    : 'off';
  public static RETRIES = process.env.retries ? parseInt(process.env.retries) : 1;
  public static RUN_IN_PARALLEL = process.env.runInParallel === 'true';
  public static WORKERS = process.env.workers ? parseInt(process.env.workers) : 1;
  public static SCREENSHOT = process.env.screenshot
    ? (process.env.screenshot as 'off' | 'on' | 'only-on-failure' | 'on-first-failure')
    : 'off';
  public static VIDEO = process.env.video
    ? (process.env.video as 'off' | 'on' | 'retain-on-failure' | 'on-first-retry')
    : 'off';

  //Users accounts
  public static getUserAccount(accountName: string): TestAccount {
    const envName = this.ENV_NAME;
    const record = userAccounts.find(a => a.accountName === accountName);
    if (!record) {
      throw new Error(`No user account "${accountName}" in utils/user.json`);
    }
    const creds = record[envName as TestEnvironmentName];
    const password = process.env[accountName];
    if (!password) {
      throw new Error(
        `Missing password for account ${accountName}. Set password in config/.env or config/.env.${envName}`,
      );
    }
    return {
      username: creds.username,
      email: creds.email,
      password,
    };
  }
}
