import { Controller, Get, Patch, Bind, Param, Body, Dependencies } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GESTAO_SERVICE } from '../gestao-client.module.js';

@Controller('planos')
@Dependencies(GESTAO_SERVICE)
export class PlanosController {
  constructor(clientProxy) {
    this.client = clientProxy;
  }

  @Get()
  async listarPlanos() {
    return await firstValueFrom(this.client.send('listar_planos', {}));
  }

  @Patch(':id')
  @Bind(Param(), Body())
  async atualizarCusto(params, body) {
    const idPlano = parseInt(params.id, 10);
    const { custoMensal } = body;
    return await firstValueFrom(
      this.client.send('atualizar_custo_plano', { idPlano, custoMensal }),
    );
  }
}
