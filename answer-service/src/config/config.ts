import {
  POLL_SERVICE,
  POSTGRES_CONFIG,
  RABBITMQ_CONFIG,
  RESULT_SERVICE,
} from '../app.constants';
import { Transport } from '@nestjs/microservices';
import ormconfig from './ormconfig';

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
  [POSTGRES_CONFIG]: ormconfig,
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
