import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  controllers: [AppController],
  providers: [RabbitMQService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'views', 'dist'),
    }),
    EventsModule,
  ],
})
export class AppModule {}
