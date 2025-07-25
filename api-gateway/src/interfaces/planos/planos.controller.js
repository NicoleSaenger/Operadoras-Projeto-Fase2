import { Controller, Get, Patch, Bind, Param, Body, Dependencies } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GESTAO_SERVICE } from '../../gestao-client.module.js';

//Controller responsável por encaminhar requisições relacionadas aos planos para o servico-gestao
@Controller('gestao/planos')
@Dependencies(GESTAO_SERVICE)
export class PlanosController {
  constructor(clientProxy) {
    this.client = clientProxy;
  }

  //Lista todos os planos
  @Get()
  async listarPlanos() {
    return await firstValueFrom(this.client.send('listar_planos', {}));
  }

  //Atualiza o custo mensal de um plano específico
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
