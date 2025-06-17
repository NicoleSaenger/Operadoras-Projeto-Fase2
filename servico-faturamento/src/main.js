import 'dotenv/config'; // Carrega as variáveis de ambiente
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectRabbitMQ } from './infrastructure/messaging/rabbitmq.js';

async function bootstrap() {
  await connectRabbitMQ(); // Conecta no RabbitMQ antes de subir o app

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3002);
}
bootstrap();
