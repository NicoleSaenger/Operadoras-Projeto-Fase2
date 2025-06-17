import { Injectable } from '@nestjs/common';
import { getChannel } from './rabbitmq.js';
import { tratarPagamentoRecebido } from '../../application/use-cases/TratarPagamento_UC.js';

@Injectable()
export class ConsumidorPagamento {
  constructor(assinaturaRepo) {
    // Verificação robusta do repositório
    if (!assinaturaRepo || typeof assinaturaRepo.recuperaPorCodigo !== 'function') {
      throw new Error('Repositório de assinatura inválido ou método recuperaPorCodigo não disponível');
    }
    this.assinaturaRepo = assinaturaRepo;
  }

  async consumir() {
    try {
      const channel = getChannel();
      const exchange = 'pagamentos';
      
      await channel.assertExchange(exchange, 'topic', { durable: true });
      const q = await channel.assertQueue('', { exclusive: true });
      await channel.bindQueue(q.queue, exchange, 'pagamento.#');

      console.log('[✓] Consumidor de pagamentos inicializado');

      channel.consume(q.queue, async (msg) => {
        if (!msg?.content) return;

        try {
          const evento = JSON.parse(msg.content.toString());
          console.log('Evento recebido:', evento.evento);

          if (['PagamentoRealizado', 'PagamentoPlanoServicoGestao'].includes(evento.evento)) {
            console.log('Processando pagamento para assinatura:', evento.dados.codAss);
            console.log('Repositório disponível:', !!this.assinaturaRepo);
            await tratarPagamentoRecebido(evento.dados, this.assinaturaRepo);
          }
        } catch (erro) {
          console.error('[X] Erro no consumo da mensagem:', erro.message);
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