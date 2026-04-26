export type TestEnvironmentName = 'qa' | 'prod';

/** `qa` / `prod` block in utils/user.json (no password in file). */
export interface TestAccountEnvCredentials {
  username: string;
  email: string;
}

/** One object in utils/user.json. */
export interface TestAccountRecord {
  accountName: string;
  description: string;
  qa: TestAccountEnvCredentials;
  prod: TestAccountEnvCredentials;
}

/** Parsed utils/user.json. */
//type TestAccountsFile = TestAccountRecord[];

/** Account for the active env: JSON username/email + password from .env. */
export interface TestAccount {
  username: string;
  email: string;
  password: string;
}
