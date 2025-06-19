import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoGestao } from '../../domain/services/ServicoGestao.js';

//Use case responsável por listar assinaturas de algum tipo em específico
@Injectable()
@Dependencies(ServicoGestao)
export class ListarAssinaturasPorTipo_UC {
  constructor(servicoGestao) {
    this.servicoGestao = servicoGestao;
  }

  //Recebe o tipo da assinatura desejada por parâmetro 
  async run(tipo) {
    return await this.servicoGestao.listarAssinaturasPorTipo(tipo);
  }
}
