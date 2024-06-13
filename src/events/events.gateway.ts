import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server } from 'ws';

@WebSocketGateway(8080)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<{ message: string }>> {
    console.log('dari client ->', data);
    const serverMessage = 'Message from server';
    let counter = 0;
    return new Observable<WsResponse<{ message: string; second: number }>>(
      (observer) => {
        const intervalId = setInterval(() => {
          counter++;
          observer.next({
            event: 'events',
            data: { message: serverMessage, second: counter },
          });
        }, 1000);

        return () => clearInterval(intervalId);
      },
    );
  }
}
