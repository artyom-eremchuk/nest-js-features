import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, disconnect } from 'mongoose';
import { MONGO_DATABASE } from 'src/configs/mongoConfig';

@Injectable()
export class MongooseService implements OnModuleInit, OnModuleDestroy {
  private readonly uri: string;

  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    this.uri = this.configService.get(MONGO_DATABASE).uri;
    this.logger.log(`[MongooseService] MongoDB URI: ${this.uri}`);
  }

  async onModuleInit() {
    await connect(this.uri);
    this.logger.log(`Connected to MongoDB: ${this.uri}`);
  }

  async onModuleDestroy() {
    await disconnect();
    this.logger.log(`Disconnected from MongoDB: ${this.uri}`);
  }
}
