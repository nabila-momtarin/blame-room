import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('-------------------Starting the application.........:)');
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(port);
  console.log(`Server is running on Port : ${port}`);
}

bootstrap();
