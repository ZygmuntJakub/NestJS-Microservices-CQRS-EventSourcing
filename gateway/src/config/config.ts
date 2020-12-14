import { AUTH_SERVICE } from '../app.constants';

export default () => ({
  port: parseInt(process.env.GATEWAY_SERVICE_PORT, 10) || 3000,
  [AUTH_SERVICE]: {
    options: {
      port: process.env.AUTH_SERVICE_PORT,
      host: process.env.AUTH_SERVICE_HOST,
    },
  },
});
