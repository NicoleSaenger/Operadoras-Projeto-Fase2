import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoGestao } from '../../domain/services/ServicoGestao.js';

//Use case responsável por atualizar o custo mensal de um plano
@Injectable()
@Dependencies(ServicoGestao)
export class AtualizarCustoPlano_UC {
  constructor(servicoGestao) {
    this.servicoGestao = servicoGestao;
  }

  //Como parâmetro recebe o id do plano e o novo custo
  async run(idPlano, novoCusto) {
    return await this.servicoGestao.atualizarCustoPlano(idPlano, novoCusto);
  }
}
