import { Controller, Get, Dependencies } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GESTAO_SERVICE } from '../gestao-client.module.js';

@Controller('clientes')
@Dependencies(GESTAO_SERVICE)
export class ClientesController {
  constructor(clientProxy) {
    this.client = clientProxy;
  }

  @Get()
  async listarClientes() {
    return await firstValueFrom(this.client.send('listar_clientes', {}));
  }
}
