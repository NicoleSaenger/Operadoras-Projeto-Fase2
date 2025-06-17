import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Adiciona o prefixo /gestao a todas as rotas
  app.setGlobalPrefix('gestao');

  await app.listen(3000);
  console.log('🚀 API Gateway rodando em http://localhost:3000/gestao');
}
bootstrap();
