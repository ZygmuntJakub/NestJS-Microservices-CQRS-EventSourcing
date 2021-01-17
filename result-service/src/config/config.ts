import {
  RABBITMQ_CONFIG,
  REDIS_CONFIG,
  ANSWER_SERVICE,
} from '../app.constants';
import { Transport } from '@nestjs/microservices';
import * as redisStore from 'cache-manager-redis-store';

export default () => ({
  [REDIS_CONFIG]: {
    store: redisStore,
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
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
});
