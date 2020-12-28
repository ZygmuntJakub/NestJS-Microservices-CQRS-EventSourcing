import { POSTGRES_CONFIG, RABBITMQ_CONFIG } from '../app.constants';
import ormconfig from './ormconfig';
import { Transport } from '@nestjs/microservices';

export default () => ({
  port: parseInt(process.env.USER_SERVICE_PORT, 10) || 3000,
  [POSTGRES_CONFIG]: ormconfig,
  [RABBITMQ_CONFIG]: {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@rabbitmq:${process.env.RABBITMQ_PORT}`,
      ],
      queue: process.env.USER_QUEUE_NAME,
      // noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  },
});
