import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { connectRabbitMQ } from './infrastructure/messaging/rabbitmq.js';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  try {
    // Conecta o canal de eventos AMQP para eventos de pagamento
    await connectRabbitMQ();

    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3001;

    // 🔽 Inicia microserviço NestJS escutando gestao_queue
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://fefqlcnv:tqVg76mx9sIg1ShHvtX7oZLWh3nhPh_r@jaragua.lmq.cloudamqp.com/fefqlcnv'],
        queue: 'gestao_queue',
        queueOptions: {
          durable: false,
        },
      },
    });

    await app.startAllMicroservices(); // ativa os @MessagePattern()
    await app.listen(port);
    console.log(`Servidor rodando na porta ${port}`);

  } catch (error) {
    console.error('Erro ao iniciar o sistema:', error);
  }
}

bootstrap();