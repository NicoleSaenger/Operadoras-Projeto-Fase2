import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller.js';
import { GestaoClientModule } from '../../gestao-client.module.js';

@Module({
  imports: [GestaoClientModule], //Importa o client proxy do servico-gestao
  controllers: [ClientesController], //Declara o controller das assinaturas
})
export class ClientesModule {}
