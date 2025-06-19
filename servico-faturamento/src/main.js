import 'dotenv/config'; // Carrega as variáveis de ambiente
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//Função que realiza a conexão com o RabbitMQ
import { connectRabbitMQ } from './infrastructure/messaging/rabbitmq.js';

async function bootstrap() {
  //Conecta ao RabbitMQ antes de iniciar a aplicação
  await connectRabbitMQ(); 

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3002);
  console.log('[✓] Serviço de faturamento rodando em http://localhost:3002');
}
bootstrap();
