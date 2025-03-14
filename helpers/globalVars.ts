import dotenv from 'dotenv';

dotenv.config({
  path: `./config/.env`,
  override: false,
});

export default class ENV {
  static frontEndBaseUrls = new Map([
    ['qa', ''],
    ['prod', 'https://www.demoblaze.com/'],
  ]);

  static backendEndBaseUrls = new Map([
    ['qa', ''],
    ['prod', 'https://jsonplaceholder.typicode.com/'],
  ]);

  //Environment
  public static ENV_NAME = process.env.env_name ? process.env.env_name : 'error';
  public static FRONTEND_BASE_URL = this.frontEndBaseUrls.get(this.ENV_NAME);
  public static BACKEND_BASE_URL = this.backendEndBaseUrls.get(this.ENV_NAME);

  //Project
  public static RUN_IN_PARALLEL = process.env.runInParallel === 'true';

  //Users test accounts
  public static USERNAME = process.env.test_username!;
  public static PASSWORD = process.env.test_password!;
}
