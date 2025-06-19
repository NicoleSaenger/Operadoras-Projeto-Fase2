import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { Transport } from '@nestjs/microservices';

//Importa a função para conexão com o canal AMQP do RabbitMQ
import { connectRabbitMQ } from './infrastructure/messaging/rabbitmq.js';

async function bootstrap() {
  try {
    //Conecta o canal de eventos AMQP para eventos de pagamento
    await connectRabbitMQ();

    //Cria a instância da aplicação NestJS
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3001;

    //Inicia microserviço NestJS escutando a fila gestao_queue
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

    await app.startAllMicroservices(); //Ativa os @MessagePattern()
    await app.listen(port);
    console.log(`[✓] Serviço gestão rodando em http://localhost:3001`);

  } catch (error) {
    console.error('[x] Erro ao iniciar o sistema:', error);
  }
}

bootstrap();