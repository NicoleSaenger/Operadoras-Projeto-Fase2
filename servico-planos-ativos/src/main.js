// main.js
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  console.log('[✓] Servidor servico-planos-ativos rodando na porta 3003');
}

bootstrap();
