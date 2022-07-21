import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import setUpEnv from '../shared/utils/setUpEnv';

export const getOrmConfig = (): PostgresConnectionOptions => {
  setUpEnv();
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
  };
};
