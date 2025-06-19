import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  //Cria instância da aplicação a partir do AppModule
  const app = await NestFactory.create(AppModule);

  // Inicia a aplicação na porta 3000 e mosrea log de inicialização
  await app.listen(3000);
  console.log('[✓] API Gateway rodando em http://localhost:3000');
}
bootstrap();
