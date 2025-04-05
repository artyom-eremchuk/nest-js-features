import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly logger: Logger) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('[PrismaService] Prisma Client connected.');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('[PrismaService] Prisma Client disconnected.');
  }
}
