import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export default class SwaggerConfig {
  static setup(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle('NestJS Features API')
      .setDescription('API documentation for the NestJS Features project')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }
}
