import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controller
import { FaturamentoController } from './interfaces/controllers/faturamento.controller.js';

// Caso de uso
import { RegistrarPagamento_UC } from './application/use-cases/RegistrarPagamento_UC.js';

// Serviço de domínio
import { ServicoFaturamento } from './domain/services/ServicoFaturamento.js';

// Entidade de domínio
import { PagamentoModel } from './domain/entities/PagamentoModel.js';

// Repositório (TypeORM)
import { TypeormPagamentoRepository } from './infrastructure/persistence/TypeormPagamentoRepository.js';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql10.freesqldatabase.com',
      port: 3306,
      username: 'sql10781136',
      password: 'NjxgXzsSMD',
      database: 'sql10781136',
      entities: [PagamentoModel],
      synchronize: true,
    }),

    // Habilita a injeção dos repositórios baseados na entidade
    TypeOrmModule.forFeature([PagamentoModel]),
  ],

  controllers: [FaturamentoController],

  providers: [
    // Injeta a implementação concreta do repositório
    {
      provide: 'IPagamentoModelRepository',
      useClass: TypeormPagamentoRepository,
    },

    // Serviço de domínio
    {
      provide: ServicoFaturamento,
      useFactory: (pagamentoRepo) => {
        return new ServicoFaturamento(pagamentoRepo);
      },
      inject: ['IPagamentoModelRepository']
    },

    // Use case da camada de aplicação
    RegistrarPagamento_UC,
  ],
})
export class AppModule {}
