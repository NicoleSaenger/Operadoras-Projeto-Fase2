import { Module } from '@nestjs/common';
import { PlanosController } from './planos.controller.js';
import { GestaoClientModule } from '../gestao-client.module.js';

@Module({
  imports: [GestaoClientModule],
  controllers: [PlanosController],
})
export class PlanosModule {}
