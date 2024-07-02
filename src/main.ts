import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true,
    // forbidUnknownValues: true,
    // forbidNonWhitelisted: true
  }));
  app.setGlobalPrefix('api');
  // const config = new DocumentBuilder()
  //   .setTitle('Stectroscopy API')
  //   .setDescription('The cats API description')
  //   .setVersion('0.1')
  //   .addTag('experiments')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
