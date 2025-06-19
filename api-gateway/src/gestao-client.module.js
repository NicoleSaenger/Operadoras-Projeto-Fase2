import { Module } from '@nestjs/common';

//Importa recursos para configurar clientes de microserviços, neste caso, o RabbitMQ
import { ClientsModule, Transport } from '@nestjs/microservices';

export const GESTAO_SERVICE = 'GESTAO_SERVICE';

//Define um módulo para configurar a comunicação com o servico-gestao via RabbitMQ
@Module({
  imports: [
    ClientsModule.register([
      {
        name: GESTAO_SERVICE,
        transport: Transport.RMQ,
        options: {
          //URL da conexão com o broker RabbitMQ
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
