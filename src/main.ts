import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(3000);
  app.setBaseViewsDir(join(__dirname, '..', '..', 'views', 'dist'));
  app.useStaticAssets(join(__dirname, '..', '..', 'views', 'dist'));
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.engine('html', require('ejs').renderFile);
  app.setViewEngine('html');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
