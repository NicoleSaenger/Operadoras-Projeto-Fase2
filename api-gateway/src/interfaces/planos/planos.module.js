import { Module } from '@nestjs/common';
import { PlanosController } from './planos.controller.js';
import { GestaoClientModule } from '../../gestao-client.module.js';

@Module({
  imports: [GestaoClientModule], //Importa o client proxy do servico-gestao
  controllers: [PlanosController], //Declara o controller dos planos
})
export class PlanosModule {}
