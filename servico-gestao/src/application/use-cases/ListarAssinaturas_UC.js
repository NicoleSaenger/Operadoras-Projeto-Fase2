import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoGestao } from '../../domain/services/ServicoGestao.js';

// Use case responsável por listar todas as assinaturas
@Injectable()
@Dependencies(ServicoGestao)
export class ListarAssinaturas_UC {
  constructor(servicoGestao) {
    this.servicoGestao = servicoGestao;
  }

  //Seleciona o tipo 'TODOS' para retornar todas as assinaturas 
  async run() {
    return await this.servicoGestao.listarAssinaturasPorTipo('TODOS');
  }
}
