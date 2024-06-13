import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';

@WebSocketGateway(8080)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<{ message: string }>> {
    console.log('dari client ->', data);
    const serverMessage = 'Message from server';
    return from([{ message: serverMessage }]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  handleEvent(@MessageBody() data: string): string {
    console.log('handleEvent', data);
    return data;
  }
}
