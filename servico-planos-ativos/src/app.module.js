import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AssinaturasController } from './interfaces/controllers/assinaturas.controller.js';
import { AssinaturasService } from './domain/services/assinaturas.service.js';
import { PagamentoHandler } from './infrastructure/messaging/pagamento.handler.js';
import { ConsumidorPagamento } from './infrastructure/messaging/consumidorPagamento.js';

@Module({
  imports: [
    //Configuração do cliente RabbitMQ para comunicação com o servico-gestao
    ClientsModule.register([
      {
        name: 'GESTAO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://fefqlcnv:tqVg76mx9sIg1ShHvtX7oZLWh3nhPh_r@jaragua.lmq.cloudamqp.com/fefqlcnv'],
          queue: 'gestao_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [
    AssinaturasController,
    PagamentoHandler,
  ],
  providers: [
    AssinaturasService, 
    ConsumidorPagamento
  ],
})
export class AppModule {}
