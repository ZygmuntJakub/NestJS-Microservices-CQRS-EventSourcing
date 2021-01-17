export default {
  type: 'postgres',
  host: process.env.POSTGRES_ANSWER_SERVICE_DB_HOSTNAME,
  port: process.env.POSTGRES_ANSWER_SERVICE_DB_PORT,
  username: process.env.POSTGRES_ANSWER_SERVICE_USERNAME,
  password: process.env.POSTGRES_ANSWER_SERVICE_PASSWORD,
  database: process.env.POSTGRES_ANSWER_SERVICE_DB,
  synchronize: false,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};