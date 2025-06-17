import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoGestao } from '../../domain/services/ServicoGestao.js';

// Use case responsável por cadastrar nova assinatura 
@Injectable()
@Dependencies(ServicoGestao)
export class CadastrarAssinatura_UC {
  constructor(servicoGestao) {
    this.servicoGestao = servicoGestao;
  }

  // Executa o cadastro a partir dos parâmetros fornecidos
  async run(codCli, codPlano, custoFinal, descricao) {
    return await this.servicoGestao.cadastrarAssinatura({
      codCli,
      codPlano,
      custoFinal,
      descricao
   });
  }
}
