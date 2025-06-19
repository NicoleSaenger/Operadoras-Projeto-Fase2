import { Controller, Get, Dependencies } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GESTAO_SERVICE } from '../../gestao-client.module.js';

//Controller responsável por encaminhar requisições relacionadas aos clientes para o servico-gestao
@Controller('gestao/clientes')
@Dependencies(GESTAO_SERVICE)
export class ClientesController {
  constructor(clientProxy) {
    this.client = clientProxy;
  }

  //Lista todos os clientes
  @Get()
  async listarClientes() {
    return await firstValueFrom(this.client.send('listar_clientes', {}));
  }
}
