import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module.js';
import { PlanosModule } from './planos/planos.module.js';
import { AssinaturasModule } from './assinaturas/assinaturas.module.js';
import { GestaoClientModule } from './gestao-client.module.js';

@Module({
  imports: [
    ClientesModule,
    PlanosModule,
    AssinaturasModule,
    GestaoClientModule,  // <-- aqui
  ],
})
export class AppModule {}
