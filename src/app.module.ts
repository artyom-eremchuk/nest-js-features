import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseService } from './mongoose/mongoose.service';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from './configs';
import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, mongoConfig],
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    MongooseModule.forRoot(mongoConfig().uri),
    UserModule,
  ],
  providers: [AppService, MongooseService, Logger],
  controllers: [AppController],
})
export class AppModule {
  constructor(private readonly logger: Logger) {
    this.logger.log('[AppModule] Initialized.');
  }
}
