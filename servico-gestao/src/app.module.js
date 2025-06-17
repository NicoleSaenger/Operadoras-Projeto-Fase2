import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller principal
import { GestaoController } from './interfaces/controllers/gestao.controller.js';

// Use cases da camada de aplicação
import { AtualizarCustoPlano_UC } from './application/use-cases/AtualizarCustoPlano_UC.js';
import { CadastrarAssinatura_UC } from './application/use-cases/CadastrarAssinatura_UC.js';
import { ListarAssinaturasDoCliente_UC } from './application/use-cases/ListarAssinaturasDoCliente_UC.js';
import { ListarAssinaturasDoPlano_UC } from './application/use-cases/ListarAssinaturasDoPlano_UC.js';
import { ListarAssinaturasPorTipo_UC } from './application/use-cases/ListarAssinaturasPorTipo_UC.js';
import { ListarClientes_UC } from './application/use-cases/ListarClientes_UC.js';
import { ListarPlanos_UC } from './application/use-cases/ListarPlanos_UC.js';

// Serviço de domínio
import { ServicoGestao } from './domain/services/ServicoGestao.js';

// Entidades
import { ClienteModel } from './domain/entities/ClienteModel.js';
import { PlanoModel } from './domain/entities/PlanoModel.js';
import { AssinaturaModel } from './domain/entities/AssinaturaModel.js';

// Repositórios
import { TypeormAssinaturaRepository } from './infrastructure/persistence/TypeormAssinaturaRepository.js';
import { TypeormPlanoRepository } from './infrastructure/persistence/TypeormPlanoRepository.js';
import { TypeormClienteRepository } from './infrastructure/persistence/TypeormClienteRepository.js';

// Consumidor de eventos do RabbitMQ
import { ConsumidorPagamento } from './infrastructure/messaging/consumidorPagamento.js';
import { GestaoMessageHandler } from './infrastructure/messaging/GestaoMessageHandler.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql10.freesqldatabase.com',
      port: 3306,
      username: 'sql10781136',
      password: 'NjxgXzsSMD',
      database: 'sql10781136',
      entities: [ClienteModel, PlanoModel, AssinaturaModel],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ClienteModel, PlanoModel, AssinaturaModel]),
  ],
  controllers: [
    GestaoController,
    GestaoMessageHandler,
  ],
  providers: [
    // Repositórios injetáveis
    {
      provide: 'IPlanoModelRepository',
      useClass: TypeormPlanoRepository,
    },
    {
      provide: 'IClienteModelRepository',
      useClass: TypeormClienteRepository,
    },
    {
      provide: 'IAssinaturaModelRepository',
      useClass: TypeormAssinaturaRepository,
    },

    // Serviço de domínio com injeção manual
    {
      provide: ServicoGestao,
      useFactory: (clienteRepo, planoRepo, assinaturaRepo) => {
        return new ServicoGestao(clienteRepo, planoRepo, assinaturaRepo);
      },
      inject: [
        'IClienteModelRepository',
        'IPlanoModelRepository',
        'IAssinaturaModelRepository',
      ],
    },

    // Consumidor de eventos RabbitMQ
    {
      provide: ConsumidorPagamento,
      useFactory: (assinaturaRepo) => {
        return new ConsumidorPagamento(assinaturaRepo);
      },
      inject: ['IAssinaturaModelRepository'],
    },

    // Casos de uso
    ListarClientes_UC,
    ListarPlanos_UC,
    AtualizarCustoPlano_UC,
    CadastrarAssinatura_UC,
    ListarAssinaturasPorTipo_UC,
    ListarAssinaturasDoCliente_UC,
    ListarAssinaturasDoPlano_UC,

    
  ],
})
export class AppModule {}
