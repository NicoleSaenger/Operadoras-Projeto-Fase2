import { Module } from '@nestjs/common';
import { AssinaturasController } from './assinaturas.controller.js';
import { GestaoClientModule } from '../../gestao-client.module.js';

@Module({
  imports: [GestaoClientModule], //Importa o client proxy do servico-gestao
  controllers: [AssinaturasController], //Declara o controller das assinaturas
})
export class AssinaturasModule {}
