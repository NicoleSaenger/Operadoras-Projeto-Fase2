import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoGestao } from '../../domain/services/ServicoGestao.js';

//Use case responsável por listar a assinatura de um cliente específico
@Injectable()
@Dependencies(ServicoGestao)
export class ListarAssinaturasDoCliente_UC {
  constructor(servicoGestao) {
    this.servicoGestao = servicoGestao;
  }

  //Recebe o código do cliente em específico por parâmetro 
  async run(codCli) {
    return await this.servicoGestao.listarAssinaturasDoCliente(codCli);
  }
}
