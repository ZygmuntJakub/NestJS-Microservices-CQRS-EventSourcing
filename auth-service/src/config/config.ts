export default () => ({
  port: parseInt(process.env.AUTH_SERVICE_PORT, 10) || 3000,
});
