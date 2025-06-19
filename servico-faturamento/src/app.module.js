import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Importa os módulos necessários para a aplicação
import { FaturamentoController } from './interfaces/controllers/faturamento.controller.js';
import { RegistrarPagamento_UC } from './application/use-cases/RegistrarPagamento_UC.js';
import { ServicoFaturamento } from './domain/services/ServicoFaturamento.js';
import { PagamentoModel } from './domain/entities/PagamentoModel.js';
import { TypeormPagamentoRepository } from './infrastructure/persistence/TypeormPagamentoRepository.js';


@Module({
  imports: [
    //Configura a conexão com o banco de dados MySQL usando TypeORM
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

    //Habilita a injeção do repositório para a entidade PagamentoModel
    TypeOrmModule.forFeature([PagamentoModel]),
  ],

  //Define o controller para lidar com as requisições HTTP
  controllers: [FaturamentoController],

  //Injeções de dependência
  providers: [  
    {
      provide: 'IPagamentoModelRepository',
      useClass: TypeormPagamentoRepository,
    },

    {
      provide: ServicoFaturamento,
      useFactory: (pagamentoRepo) => {
        return new ServicoFaturamento(pagamentoRepo);
      },
      inject: ['IPagamentoModelRepository']
    },

    RegistrarPagamento_UC,
  ],
})
export class AppModule {}
