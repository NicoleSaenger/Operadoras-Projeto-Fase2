import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FaturamentoController } from './faturamento.controller.js';

@Module({
  imports: [HttpModule],
  controllers: [FaturamentoController],
})
export class FaturamentoModule {}
