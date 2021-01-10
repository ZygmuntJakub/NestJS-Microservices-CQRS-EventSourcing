import {
  ANSWER_SERVICE,
  AUTH_SERVICE,
  POLL_SERVICE,
  RESULT_SERVICE,
  USER_SERVICE,
} from '../app.constants';
import { Transport } from '@nestjs/microservices';

export default () => ({
  port: parseInt(process.env.GATEWAY_SERVICE_PORT, 10) || 3000,
  [AUTH_SERVICE]: {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@rabbitmq:${process.env.RABBITMQ_PORT}`,
      ],
      queue: process.env.AUTH_QUEUE_NAME,
      queueOptions: {
        durable: true,
      },
    },
  },
  [USER_SERVICE]: {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@rabbitmq:${process.env.RABBITMQ_PORT}`,
      ],
      queue: process.env.USER_QUEUE_NAME,
      queueOptions: {
        durable: true,
      },
    },
  },
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
  [ANSWER_SERVICE]: {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@rabbitmq:${process.env.RABBITMQ_PORT}`,
      ],
      queue: process.env.ANSWER_QUEUE_NAME,
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
});
