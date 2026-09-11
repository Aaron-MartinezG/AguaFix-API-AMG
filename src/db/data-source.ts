import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { envs } from '../config/envs';
import { Report } from '../reports/entities/report.entity';
import { User } from '../users/entities/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  entities: [Report, User],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;