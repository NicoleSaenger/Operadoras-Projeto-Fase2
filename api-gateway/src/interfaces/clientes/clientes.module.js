import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller.js';
import { GestaoClientModule } from '../../gestao-client.module.js';

@Module({
  imports: [GestaoClientModule],
  controllers: [ClientesController],
})
export class ClientesModule {}
