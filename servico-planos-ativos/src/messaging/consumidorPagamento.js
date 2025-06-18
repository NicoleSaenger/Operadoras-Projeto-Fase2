import { Injectable } from '@nestjs/common';
import { getChannel } from './rabbitmq.js';
import { AssinaturasService } from '../domain/assinaturas.service.js';

@Injectable()
export class ConsumidorPagamento {
  constructor(assinaturasService) {
    this.assinaturasService = assinaturasService;
  }

  async consumir() {
    try {
      const channel = await getChannel(); // <-- IMPORTANTE: await aqui
      const exchange = 'pagamentos';

      await channel.assertExchange(exchange, 'topic', { durable: true });

      const q = await channel.assertQueue('', { exclusive: true });
      await channel.bindQueue(q.queue, exchange, 'pagamento.#');

      console.log('[✓] Consumidor PlanosAtivos ouvindo eventos de pagamento...');

      channel.consume(q.queue, async (msg) => {
        if (!msg?.content) return;

        try {
          const evento = JSON.parse(msg.content.toString());
          console.log('[→] Evento recebido:', evento.evento);

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
      console.error('[X] Erro na configuração do consumidor (PlanosAtivos):', erro.message);
    }
  }

  async onModuleInit() {
    await this.consumir();
  }
}
