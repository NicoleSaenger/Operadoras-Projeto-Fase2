import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⚠️ Não aplicamos o prefixo global, pois agora temos múltiplos domínios (gestao, faturamento)
  // Se aplicássemos app.setGlobalPrefix('gestao'), isso quebraria o /faturamento

  await app.listen(3000);
  console.log('🚀 API Gateway rodando em http://localhost:3000');
  console.log('➡️  Endpoints gestão via /gestao');
  console.log('➡️  Endpoints faturamento via /faturamento');
}
bootstrap();
