import { Injectable } from '@nestjs/common';
import { getChannel } from './rabbitmq.js';
import { tratarPagamentoRecebido } from '../../application/use-cases/TratarPagamento_UC.js';

//Consumidor responsável por escutar mensagens de pagamento vindas do RabbitMQ
@Injectable()
export class ConsumidorPagamento {
  constructor(assinaturaRepo) {
    //Verifica se o repositório recebido é válido
    if (!assinaturaRepo || typeof assinaturaRepo.recuperaPorCodigo !== 'function') {
      throw new Error('[!] Repositório de assinatura inválido ou método recuperaPorCodigo não disponível');
    }
    this.assinaturaRepo = assinaturaRepo;
  }

  //Método principal que inicia a escuta de eventos de pagamento
  async consumir() {
    try {
      const channel = getChannel();
      const exchange = 'pagamentos';
      
      //Cria uma fila exclusiva para o consumidor atual
      await channel.assertExchange(exchange, 'topic', { durable: true });
      const q = await channel.assertQueue('', { exclusive: true });
      await channel.bindQueue(q.queue, exchange, 'pagamento.#');

      console.log('[✓] Consumidor de pagamentos inicializado');

      //Inicia o consumo de mensagens
      channel.consume(q.queue, async (msg) => {
        if (!msg?.content) return;

        try {
          const evento = JSON.parse(msg.content.toString());
          console.log('Evento recebido:', evento.evento);

          //Processa eventos de pagamento
          if (['PagamentoRealizado', 'PagamentoPlanoServicoGestao'].includes(evento.evento)) {
            console.log('[!] Processando pagamento para assinatura:', evento.dados.codAss);            
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