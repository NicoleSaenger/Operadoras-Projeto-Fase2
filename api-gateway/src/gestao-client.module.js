// gestao-client.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

export const GESTAO_SERVICE = 'GESTAO_SERVICE';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GESTAO_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://fefqlcnv:tqVg76mx9sIg1ShHvtX7oZLWh3nhPh_r@jaragua.lmq.cloudamqp.com/fefqlcnv'],
          queue: 'gestao_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class GestaoClientModule {}
