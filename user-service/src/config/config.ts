import { POSTGRES_CONFIG } from '../app.constants';
import ormconfig from './ormconfig';

export default () => ({
  port: parseInt(process.env.USER_SERVICE_PORT, 10) || 3000,
  [POSTGRES_CONFIG]: ormconfig,
});
