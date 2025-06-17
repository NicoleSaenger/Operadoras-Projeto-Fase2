import { Injectable, Dependencies } from '@nestjs/common';
import { ServicoGestao } from '../../domain/services/ServicoGestao.js';

// Use case responsável por listar os clientes
@Injectable()
@Dependencies(ServicoGestao)
export class ListarClientes_UC {
  constructor(servicoGestao) {
    this.servicoGestao = servicoGestao;
  }

  async run() {
    return await this.servicoGestao.listarClientes();
  }
}
