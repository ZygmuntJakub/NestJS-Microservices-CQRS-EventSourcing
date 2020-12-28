import { AUTH_SERVICE, POLL_SERVICE } from '../app.constants';
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
});
