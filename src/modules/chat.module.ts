import { Module } from '@nestjs/common';
import { ChatGateway } from 'src/gateways/chat.gateway';

@Module({
  imports: [],
  providers: [ChatGateway],
})
export class ChatModule {}
