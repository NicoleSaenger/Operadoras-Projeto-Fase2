import { Module } from '@nestjs/common';

// Importa o serviço HTTP do NestJS baseado em Axios
import { HttpModule } from '@nestjs/axios';
import { FaturamentoController } from './faturamento.controller.js';

@Module({
  imports: [HttpModule], //Importa o HttpModule para permitir requisições HTTP
  controllers: [FaturamentoController], //Declara o controller de faturamento
})
export class FaturamentoModule {}
