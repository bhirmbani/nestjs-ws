import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RabbitMQService } from './rabbitmq.service';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  controllers: [AppController],
  providers: [RabbitMQService, ChatGateway],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'views', 'dist'),
    }),
    EventsModule,
  ],
})
export class AppModule {}
