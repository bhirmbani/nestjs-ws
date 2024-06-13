import { Get, Controller, Render, Post, Body } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { NotificationDto } from './notification.dto';

@Controller()
export class AppController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  @Post('send-notification')
  async sendNotification(@Body() notification: NotificationDto) {
    await this.rabbitMQService.sendNotification(notification);
    return { message: 'Notification sent to RabbitMQ' };
  }
}
