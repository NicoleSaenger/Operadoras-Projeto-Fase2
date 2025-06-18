// app.module.js
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AssinaturasController } from './controllers/assinaturas.controller.js';
import { AssinaturasService } from './domain/assinaturas.service.js';
import { PagamentoHandler } from './messaging/pagamento.handler.js';
import { ConsumidorPagamento } from './messaging/consumidorPagamento.js';

@Module({
  imports: [
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
    PagamentoHandler, // handler será ativado via @MessagePattern
  ],
  providers: [AssinaturasService, ConsumidorPagamento],
})
export class AppModule {}
