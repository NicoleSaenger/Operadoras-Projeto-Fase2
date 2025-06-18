import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module.js';
import { PlanosModule } from './planos/planos.module.js';
import { AssinaturasModule } from './assinaturas/assinaturas.module.js';
import { GestaoClientModule } from './gestao-client.module.js';
import { FaturamentoModule } from './faturamento/faturamento.module.js';
import { HttpModule } from '@nestjs/axios';
import { PlanosAtivosModule } from './planosAtivos/planosativos.module.js';


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
