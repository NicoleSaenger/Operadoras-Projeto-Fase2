import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoGestao } from '../../domain/services/ServicoGestao.js';

// Use case responsável por listar assinaturas de um plano
@Injectable()
@Dependencies(ServicoGestao)
export class ListarAssinaturasDoPlano_UC {
  constructor(servicoGestao) {
    this.servicoGestao = servicoGestao;
  }

  // Recebe o código do plano em específico por parâmetro 
  async run(codPlano) {
    return await this.servicoGestao.listarAssinaturasDoPlano(codPlano);
  }
}
