import { DataSource } from 'typeorm';
import { getOrmConfig } from './config';

export const dataSource = new DataSource(getOrmConfig());
