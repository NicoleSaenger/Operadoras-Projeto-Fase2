import { Injectable, Dependencies } from '@nestjs/common';

//Importa o serviço de domínio responsável pela lógica de faturamento
import { ServicoFaturamento } from '../../domain/services/ServicoFaturamento.js';

//Use case responsável por registrar um pagamento
@Injectable()
@Dependencies(ServicoFaturamento)
export class RegistrarPagamento_UC {
  constructor(servicoFaturamento) {
    this.servicoFaturamento = servicoFaturamento;
  }

  //Executa o registro do pagamento com base nos dados fornecidos
  async run({ codAss, dataPagamento, valorPago }) {
    //Converte a string de data recebida para um objeto Date
    const data = new Date(dataPagamento); 

    //Valida se a conversão foi bem-sucedida
    if (isNaN(data)) {
      throw new Error('Data de pagamento inválida.');
    }

    //Delega a lógica de persistência ao serviço de domínio
    return await this.servicoFaturamento.registrarPagamento({
      codAss,
      valorPago,
      dataPagamento: data,
    });
  }
}