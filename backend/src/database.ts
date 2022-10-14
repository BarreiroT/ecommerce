import { DataSource } from 'typeorm';
import 'reflect-metadata';

import { PersistedOrder } from './models';
import { PersistedProduct } from './models/Product';

const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_PORT = Number(process.env.DATABASE_PORT) || 5432;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'postgres';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '';
const DATABASE = process.env.DATABASE || '';
const isProd = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'testing';

export const PostgresSource = new DataSource({
    type: 'postgres',
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE,
    synchronize: true,
    logging: !isProd,
    subscribers: [],
    migrations: [],
    entities: [PersistedOrder, PersistedProduct],
    dropSchema: isTesting,
});
