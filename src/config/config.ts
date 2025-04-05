import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    port: process.env.PORT,
    database: {
      type: process.env.DB_TYPE || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'database',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    },
  };
});
