import { POSTGRES_CONFIG } from '../app.constants';

export default () => ({
  port: parseInt(process.env.USER_SERVICE_PORT, 10) || 3000,
  [POSTGRES_CONFIG]: {
    type: 'postgres',
    host: process.env.POSTGRES_USER_SERVICE_DB_HOSTNAME,
    port: process.env.POSTGRES_USER_SERVICE_DB_PORT,
    username: process.env.POSTGRES_USER_SERVICE_USERNAME,
    password: process.env.POSTGRES_USER_SERVICE_PASSWORD,
    database: process.env.POSTGRES_USER_SERVICE_DB,
    synchronize: true,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
  },
});
