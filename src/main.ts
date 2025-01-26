import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Cocos Challenge API')
      .setDescription('API para manejar portafolios, instrumentos y órdenes')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(process.env.API_PORT || 3000);

  console.log(`Application is running on: http://localhost:${process.env.API_PORT || 3000}`);
  console.log(`Swagger docs available at: http://localhost:${process.env.API_PORT || 3000}/docs`);
}

bootstrap();
