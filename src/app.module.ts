import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    UserModule,
  ],
  providers: [AppService, PrismaService],
  controllers: [AppController],
})
export class AppModule {}
