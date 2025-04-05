import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './configs';
import { Logger } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    UserModule,
  ],
  providers: [AppService, PrismaService, Logger],
  controllers: [AppController],
})
export class AppModule {
  constructor(private readonly logger: Logger) {
    this.logger.log('[AppModule] Initialized.');
  }
}
