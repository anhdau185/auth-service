import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'auth_service_dev01',
  synchronize: false,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/db/migrations/*.js'],
};

export const dataSource = new DataSource(ormConfig);
