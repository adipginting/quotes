import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const doc = new DocumentBuilder().setTitle('Stoic quote API').setDescription("Simple API end points to get random quotes from Stoicism's four classic books").setVersion('0.0.1').build();
  const conf = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('api-doc', app, conf);
  await app.listen(3000);
}
bootstrap();
