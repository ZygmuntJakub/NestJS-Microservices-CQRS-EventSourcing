import { POSTGRES_CONFIG, RABBITMQ_CONFIG } from '../app.constants';
import { Transport } from '@nestjs/microservices';

export default () => ({
  port: parseInt(process.env.POLL_SERVICE_PORT, 10) || 3000,
  [POSTGRES_CONFIG]: {
    type: 'postgres',
    host: process.env.POSTGRES_POLL_SERVICE_DB_HOSTNAME,
    port: process.env.POSTGRES_POLL_SERVICE_DB_PORT,
    username: process.env.POSTGRES_POLL_SERVICE_USERNAME,
    password: process.env.POSTGRES_POLL_SERVICE_PASSWORD,
    database: process.env.POSTGRES_POLL_SERVICE_DB,
    synchronize: true,
    dropSchema: true,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
  },
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
