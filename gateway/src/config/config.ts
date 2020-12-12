import { USER_SERVICE } from '../app.constants';

export default () => ({
  port: parseInt(process.env.GATEWAY_SERVICE_PORT, 10) || 3000,
  [USER_SERVICE]: {
    options: {
      port: process.env.USER_SERVICE_PORT,
      host: process.env.USER_SERVICE_HOST,
    },
  },
});
