import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  // crete swagger specification
  const options = new DocumentBuilder()
    .setTitle('Simple API')
    .setDescription('Simple API with authorization')
    .setVersion('1.0')
    .addBearerAuth()
    .setSchemes('https')
    .setHost('simple-api-auth.herokuapp.com')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // expose swagger ui on /docs
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}
bootstrap();
