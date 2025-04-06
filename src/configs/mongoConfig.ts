import { registerAs } from '@nestjs/config';

export const MONGO_DATABASE = 'mongo';

export default registerAs(MONGO_DATABASE, () => {
  const host = process.env.MONGO_HOST || 'localhost';
  const port = process.env.MONGO_PORT || 27017;
  const username = process.env.MONGO_USERNAME || 'admin';
  const password = process.env.MONGO_PASSWORD || 'pass';

  return {
    uri: `mongodb://${username}:${password}@${host}:${port}`,
  };
});
