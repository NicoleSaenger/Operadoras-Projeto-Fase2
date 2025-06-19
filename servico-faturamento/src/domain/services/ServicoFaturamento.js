import { Injectable } from '@nestjs/common';

//Importa a função responsável por publicar eventos no broker RabbitMQ
import { publicarEventoPagamento } from '../../infrastructure/messaging/publicadorPagamento.js';

@Injectable()
export class ServicoFaturamento {
  constructor(repositorioPagamento) {
    this.repositorioPagamento = repositorioPagamento;
  }

  //Método principal para registrar um pagamento
  async registrarPagamento(dadosPagamento) {

    //Salva os dados do pagamento no repositório
    const pagamentoSalvo = await this.repositorioPagamento.cadastra(dadosPagamento);

    //Publica um evento de pagamento no RabbitMQ para notificar outros serviços
    await publicarEventoPagamento({
      codAss: dadosPagamento.codAss,
      valorPago: dadosPagamento.valorPago,
      dataPagamento: dadosPagamento.dataPagamento
    });

    //Retorna o pagamento salvo
    return pagamentoSalvo;
  }
}

