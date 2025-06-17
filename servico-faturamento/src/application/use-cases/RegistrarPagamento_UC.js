import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoFaturamento } from '../../domain/services/ServicoFaturamento.js';

// Use case responsável por registrar um pagamento
@Injectable()
@Dependencies(ServicoFaturamento)
export class RegistrarPagamento_UC {
  constructor(servicoFaturamento) {
    this.servicoFaturamento = servicoFaturamento;
  }

  // Executa o registro do pagamento com base nos dados fornecidos
  async run({ codAss, dataPagamento, valorPago }) {
    const data = new Date(dataPagamento); // Garante que seja um objeto Date

    if (isNaN(data)) {
      throw new Error('Data de pagamento inválida.');
    }

    return await this.servicoFaturamento.registrarPagamento({
      codAss,
      valorPago,
      dataPagamento: data,
    });
  }
}