import { Controller, Post, Get, Bind, Param, Body, Dependencies } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GESTAO_SERVICE } from '../../gestao-client.module.js';

@Controller()
@Dependencies(GESTAO_SERVICE)
export class AssinaturasController {
  constructor(clientProxy) {
    this.client = clientProxy;
  }

  @Post('gestao/assinaturas')
  @Bind(Body())
  async cadastrarAssinatura(body) {
    const { codCli, codPlano, custoFinal, descricao } = body;
    return await firstValueFrom(
      this.client.send('cadastrar_assinatura', { codCli, codPlano, custoFinal, descricao }),
    );
  }

  @Get('gestao/assinaturas/:tipo')
  @Bind(Param())
  async listarPorTipo(params) {
    return await firstValueFrom(this.client.send('listar_assinaturas_tipo', { tipo: params.tipo }));
  }

  @Get('gestao/assinaturascliente/:codcli')
  @Bind(Param())
  async listarPorCliente(params) {
    return await firstValueFrom(this.client.send('listar_assinaturas_cliente', { codcli: params.codcli }));
  }

  @Get('gestao/assinaturasplano/:codplano')
  @Bind(Param())
  async listarPorPlano(params) {
    return await firstValueFrom(this.client.send('listar_assinaturas_plano', { codplano: params.codplano }));
  }
}
