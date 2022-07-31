import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import loadEnv from '../shared/utils/loadEnv';

export const getOrmConfig = (): PostgresConnectionOptions => {
  loadEnv();
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
  };
};
