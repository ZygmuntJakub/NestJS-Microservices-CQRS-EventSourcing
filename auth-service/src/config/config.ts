import { USER_SERVICE } from '../app.constants';

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
});
