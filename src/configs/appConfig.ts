import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    port: process.env.PORT || 3000,
  };
});
