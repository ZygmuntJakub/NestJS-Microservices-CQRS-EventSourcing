import { POSTGRES_CONFIG, RABBITMQ_CONFIG } from '../app.constants';
import { Transport } from '@nestjs/microservices';

export default () => ({
  [POSTGRES_CONFIG]: {
    type: 'postgres',
    host: process.env.POSTGRES_RESULT_SERVICE_DB_HOSTNAME,
    port: process.env.POSTGRES_RESULT_SERVICE_DB_PORT,
    username: process.env.POSTGRES_RESULT_SERVICE_USERNAME,
    password: process.env.POSTGRES_RESULT_SERVICE_PASSWORD,
    database: process.env.POSTGRES_RESULT_SERVICE_DB,
    synchronize: true,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
  },
  [RABBITMQ_CONFIG]: {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@rabbitmq:${process.env.RABBITMQ_PORT}`,
      ],
      queue: process.env.RESULT_QUEUE_NAME,
      // noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  },
});
