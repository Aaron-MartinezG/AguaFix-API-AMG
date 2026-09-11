import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  DB_HOST: env.get('DB_HOST').required().asString(),
  DB_PORT: env.get('DB_PORT').required().asPortNumber(),
  DB_USER: env.get('DB_USER').required().asString(),
  DB_PASSWORD: env.get('DB_PASSWORD').required().asString(),
  DB_NAME: env.get('DB_NAME').required().asString(),
  MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
  MAILER_USER: env.get('MAILER_USER').required().asString(),
  MAILER_TOKEN: env.get('MAILER_TOKEN').required().asString(),
  MAINTENANCE_EMAIL: env.get('MAINTENANCE_EMAIL').required().asString(),
};