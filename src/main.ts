import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // use validation pipe
  app.useGlobalPipes(new ValidationPipe(
    {whitelist: true,}
  ));

  // swagger configuration
  const config = new DocumentBuilder()
  .setTitle('Blog API')
  .setDescription('Use the api url as http://localhost:3000/')
  .setTermsOfService('http://localhost:3000/terms-of-service')
  .setLicense('MIT License', '')
  .addServer('http://localhost:3000')
  .setVersion('1.0')
  .build();

  // Instantiate Document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
