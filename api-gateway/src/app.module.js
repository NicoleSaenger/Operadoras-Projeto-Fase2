// Importa os módulos do NestJS
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

// Importa os módulos necessários para o aplicativo
import { GestaoClientModule } from './gestao-client.module.js';
import { ClientesModule } from './interfaces/clientes/clientes.module.js';
import { PlanosModule } from './interfaces/planos/planos.module.js';
import { AssinaturasModule } from './interfaces/assinaturas/assinaturas.module.js';
import { FaturamentoModule } from './interfaces/faturamento/faturamento.module.js';
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
