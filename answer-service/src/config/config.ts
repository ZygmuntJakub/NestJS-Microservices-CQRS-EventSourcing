import {
  POLL_SERVICE,
  POSTGRES_CONFIG,
  RABBITMQ_CONFIG,
  RESULT_SERVICE,
} from '../app.constants';
import { Transport } from '@nestjs/microservices';

export default () => ({
  [POLL_SERVICE]: {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@rabbitmq:${process.env.RABBITMQ_PORT}`,
      ],
      queue: process.env.POLL_QUEUE_NAME,
      queueOptions: {
        durable: true,
      },
    },
  },
  [RESULT_SERVICE]: {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@rabbitmq:${process.env.RABBITMQ_PORT}`,
      ],
      queue: process.env.RESULT_QUEUE_NAME,
      queueOptions: {
        durable: true,
      },
    },
  },
  [POSTGRES_CONFIG]: {
    type: 'postgres',
    host: process.env.POSTGRES_ANSWER_SERVICE_DB_HOSTNAME,
    port: process.env.POSTGRES_ANSWER_SERVICE_DB_PORT,
    username: process.env.POSTGRES_ANSWER_SERVICE_USERNAME,
    password: process.env.POSTGRES_ANSWER_SERVICE_PASSWORD,
    database: process.env.POSTGRES_ANSWER_SERVICE_DB,
    synchronize: false,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
  },
  [RABBITMQ_CONFIG]: {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@rabbitmq:${process.env.RABBITMQ_PORT}`,
      ],
      queue: process.env.ANSWER_QUEUE_NAME,
      // noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  },
});
