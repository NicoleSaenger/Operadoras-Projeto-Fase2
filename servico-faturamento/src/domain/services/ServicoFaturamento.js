import { Injectable } from '@nestjs/common';
import { publicarEventoPagamento } from '../../infrastructure/messaging/publicadorPagamento.js';

@Injectable()
export class ServicoFaturamento {
  constructor(repositorioPagamento) {
    this.repositorioPagamento = repositorioPagamento;
  }

  // Método principal: registra o pagamento
  async registrarPagamento(dadosPagamento) {
    // 1. Salva no banco
    const pagamentoSalvo = await this.repositorioPagamento.cadastra(dadosPagamento);

    // 2. Publica o evento real no RabbitMQ
    await publicarEventoPagamento({
      codAss: dadosPagamento.codAss,
      valorPago: dadosPagamento.valorPago,
      dataPagamento: dadosPagamento.dataPagamento
    });


    return pagamentoSalvo;
  }
}

