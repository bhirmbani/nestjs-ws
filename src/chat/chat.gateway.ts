import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Server } from 'ws';

@WebSocketGateway(8081, { cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  @SubscribeMessage('chat')
  onEvent(client: any, data: any): Observable<WsResponse<{ message: string }>> {
    console.log('dari client ->', data);
    return new Observable<WsResponse<{ message: string }>>((observer) => {
      observer.next({
        event: 'chat',
        data: { message: data },
      });
      observer.complete();
    });
  }
}
