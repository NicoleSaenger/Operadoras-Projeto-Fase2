import { Module } from '@nestjs/common';
import { ClientesModule } from './interfaces/clientes/clientes.module.js';
import { PlanosModule } from './interfaces/planos/planos.module.js';
import { AssinaturasModule } from './interfaces/assinaturas/assinaturas.module.js';
import { GestaoClientModule } from './gestao-client.module.js';
import { FaturamentoModule } from './interfaces/faturamento/faturamento.module.js';
import { HttpModule } from '@nestjs/axios';
import { PlanosAtivosModule } from './interfaces/planosAtivos/planosativos.module.js';


@Module({
  imports: [
    HttpModule,
    ClientesModule,
    PlanosModule,
    AssinaturasModule,
    GestaoClientModule,
    FaturamentoModule,
    PlanosAtivosModule
  ],
})
export class AppModule {}
