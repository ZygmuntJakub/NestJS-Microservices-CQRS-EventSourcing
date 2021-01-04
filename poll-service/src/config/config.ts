import { POSTGRES_CONFIG, RABBITMQ_CONFIG } from '../app.constants';
import { Transport } from '@nestjs/microservices';
import ormconfig from './ormconfig';

export default () => ({
  port: parseInt(process.env.POLL_SERVICE_PORT, 10) || 3000,
  [POSTGRES_CONFIG]: ormconfig,
  [RABBITMQ_CONFIG]: {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@rabbitmq:${process.env.RABBITMQ_PORT}`,
      ],
      queue: process.env.POLL_QUEUE_NAME,
      // noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  },
});
