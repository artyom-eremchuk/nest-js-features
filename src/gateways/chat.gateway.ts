import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

interface Client {
  id: string;
  username: string;
}

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private clients: Map<string, Client> = new Map();
  private readonly logger = new Logger(ChatGateway.name);

  afterInit() {
    this.logger.log('Server initialized');
  }

  handleConnection(client: Socket) {
    const username = client.handshake.query.username as string;

    if (username) {
      this.logger.log(`Client connected: ${username}`);
      this.clients.set(client.id, { id: client.id, username });
    } else {
      this.logger.log(`Client connected: ${client.id}, No username provided`);
    }
  }

  handleDisconnect(client: Socket) {
    const username = this.clients.get(client.id)?.username || 'Unknown';
    this.logger.log(`Client disconnected: ${username}`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    const sender = this.clients.get(client.id);

    if (sender) {
      client.broadcast.emit('message', {
        clientId: sender.username,
        message: data,
      });
    }
  }
}
