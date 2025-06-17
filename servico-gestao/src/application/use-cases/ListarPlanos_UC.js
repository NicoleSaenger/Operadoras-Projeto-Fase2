import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoGestao } from '../../domain/services/ServicoGestao.js';

// Use case responsável por listar os planos
@Injectable()
@Dependencies(ServicoGestao)
export class ListarPlanos_UC {
  constructor(servicoGestao) {
    this.servicoGestao = servicoGestao;
  }

  async run() {
    return await this.servicoGestao.listarPlanos();
  }
}
