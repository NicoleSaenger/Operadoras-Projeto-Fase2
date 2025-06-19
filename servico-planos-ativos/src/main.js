import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Conecta o microserviço com RabbitMQ
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://fefqlcnv:tqVg76mx9sIg1ShHvtX7oZLWh3nhPh_r@jaragua.lmq.cloudamqp.com/fefqlcnv'],
      queue: '',
      queueOptions: { exclusive: true },
      noAck: true,
    },
  });

  await app.init(); // <---- ESSA LINHA É FUNDAMENTAL
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3003);
  console.log('[✓] Serviço de faturamento rodando em http://localhost:3003');
}

bootstrap();
