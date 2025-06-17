import { Module } from '@nestjs/common';
import { AssinaturasController } from './assinaturas.controller.js';
import { GestaoClientModule } from '../gestao-client.module.js';

@Module({
  imports: [GestaoClientModule],
  controllers: [AssinaturasController],
})
export class AssinaturasModule {}
