import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export default class SwaggerConfig {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('NestJS Features API')
      .setDescription('API documentation for the NestJS Features project')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }
}
