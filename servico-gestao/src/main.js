import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { consumirEventosPagamento } from './infrastructure/messaging/consumidorPagamento.js';
import { connectRabbitMQ } from './infrastructure/messaging/rabbitmq.js';

async function bootstrap() {
  try {
    // Conecta o RabbitMQ antes de iniciar o Nest
    await connectRabbitMQ();
    console.log('RabbitMQ conectado com sucesso!');

    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3001;

    await app.listen(port);
    console.log(`Servidor rodando na porta ${port}`);

  } catch (error) {
    console.error('Erro ao iniciar o sistema:', error);
  }
}

bootstrap();