import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoGestao } from '../../domain/services/ServicoGestao.js';

// Use case responsável por verificar se uma assinatura está ativa
@Injectable()
@Dependencies(ServicoGestao)
export class VerificarAssinaturaAtiva_UC {
  constructor(servicoGestao) {
    this.servicoGestao = servicoGestao;
  }

  // Recebe o código da assinatura e verifica se está ativa
  async run(codAss) {
    return await this.servicoGestao.verificarAssinaturaAtiva(codAss);
  }
}
