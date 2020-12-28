import { RABBITMQ_CONFIG, USER_SERVICE } from '../app.constants';
import { Transport } from '@nestjs/microservices';

export default () => ({
  port: parseInt(process.env.AUTH_SERVICE_PORT, 10) || 3000,
  [USER_SERVICE]: {
    options: {
      host: process.env.USER_SERVICE_HOST,
      port: process.env.USER_SERVICE_PORT,
    },
  },
  JWT_CONFIG: {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '20m' },
  },
  [RABBITMQ_CONFIG]: {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@rabbitmq:${process.env.RABBITMQ_PORT}`,
      ],
      queue: process.env.AUTH_QUEUE_NAME,
      // noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  },
});
