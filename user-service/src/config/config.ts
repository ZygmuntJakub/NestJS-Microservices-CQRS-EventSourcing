export default () => ({
  port: parseInt(process.env.USER_SERVICE_PORT, 10) || 3000,
});
