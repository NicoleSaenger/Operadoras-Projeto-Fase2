import { Injectable, Dependencies  } from '@nestjs/common';
import { getChannel } from './rabbitmq.js';
import { AssinaturasService } from '../../domain/services/assinaturas.service.js';

//Classe que escuta eventos no RabbitMQ relacionados a pagamentos
@Injectable()
@Dependencies(AssinaturasService) 
export class ConsumidorPagamento {
  constructor(assinaturasService) {
    this.assinaturasService = assinaturasService;
  }

  async consumir() {
    try {
      //Conecta ao canal do RabbitMQ
      const channel = await getChannel();
      const exchange = 'pagamentos';

      //Garante que a exchange exista
      await channel.assertExchange(exchange, 'topic', { durable: true });

      //Cria uma fila exclusiva para escutar os eventos
      const q = await channel.assertQueue('', { exclusive: true });
      await channel.bindQueue(q.queue, exchange, 'pagamento.#');
      
      //Começa a consumir mensagens da fila
      channel.consume(q.queue, async (msg) => {
        if (!msg?.content) return;

        try {
          const evento = JSON.parse(msg.content.toString());
          console.log('[→] Evento recebido:', evento.evento);

          //Se for um dos eventos esperados, remove assinatura do cache
          if (['PagamentoRealizado', 'PagamentoPlanoServicoGestao'].includes(evento.evento)) {
            const codAss = evento.dados.codAss;
            console.log('[x] Removendo assinatura do cache:', codAss);
            this.assinaturasService.remove(codAss);
          }
        } catch (err) {
          console.error('[X] Erro ao processar mensagem:', err.message);
        }
      }, { noAck: true });

    } catch (erro) {
      console.error('[X] Erro na configuração do consumidor:', erro.message);
    }
  }

  async onModuleInit() {
    await this.consumir();
  }
}
