import { Controller, Dependencies, Get, Post, Patch, Bind, Body, Param } from '@nestjs/common';

import { ListarClientes_UC } from '../../application/use-cases/ListarClientes_UC.js';
import { ListarPlanos_UC } from '../../application/use-cases/ListarPlanos_UC.js';
import { AtualizarCustoPlano_UC } from '../../application/use-cases/AtualizarCustoPlano_UC.js';
import { CadastrarAssinatura_UC } from '../../application/use-cases/CadastrarAssinatura_UC.js';
import { ListarAssinaturasPorTipo_UC } from '../../application/use-cases/ListarAssinaturasPorTipo_UC.js';
import { ListarAssinaturasDoCliente_UC } from '../../application/use-cases/ListarAssinaturasDoCliente_UC.js';
import { ListarAssinaturasDoPlano_UC } from '../../application/use-cases/ListarAssinaturasDoPlano_UC.js';

// Controlador principal da gestão de clientes, planos e assinaturas
@Controller('gestao')
@Dependencies(
  ListarClientes_UC,
  ListarPlanos_UC,
  AtualizarCustoPlano_UC,
  CadastrarAssinatura_UC,
  ListarAssinaturasPorTipo_UC,
  ListarAssinaturasDoCliente_UC,
  ListarAssinaturasDoPlano_UC
)
export class GestaoController {
  constructor(
    listarClientesUC,
    listarPlanosUC,
    atualizarCustoPlanoUC,
    cadastrarAssinaturaUC,
    listarAssinaturasTipoUC,
    listarAssinaturasClienteUC,
    listarAssinaturasPlanoUC
  ) {
    this.listarClientesUC = listarClientesUC;
    this.listarPlanosUC = listarPlanosUC;
    this.atualizarCustoPlanoUC = atualizarCustoPlanoUC;
    this.cadastrarAssinaturaUC = cadastrarAssinaturaUC;
    this.listarAssinaturasTipoUC = listarAssinaturasTipoUC;
    this.listarAssinaturasClienteUC = listarAssinaturasClienteUC;
    this.listarAssinaturasPlanoUC = listarAssinaturasPlanoUC;
  }

  // Endpoint responsável por retornar a lista de todos os clientes
  @Get('clientes')
  async listarClientes() {
    return await this.listarClientesUC.run();
  }

  // Retorna a lista de todos os planos
  @Get('planos')
  async listarPlanos() {
    return await this.listarPlanosUC.run();
  }

  // Atualiza o custo mensal de um plano
  @Patch('planos/:idPlano')
  @Bind(Param(), Body())
  async atualizarCusto(params, body) {
    const id = parseInt(params.idPlano);
    const { custoMensal } = body;
    return await this.atualizarCustoPlanoUC.run(id, custoMensal);
  }

  // Cadastra uma nova assinatura
  @Post('assinaturas')
  @Bind(Body())
  async cadastrarAssinatura(body) {
    const { codCli, codPlano, custoFinal, descricao } = body;
    return await this.cadastrarAssinaturaUC.run(
      codCli,
      codPlano,
      custoFinal,
      descricao 
    );
  }

  // Retorna assinaturas filtradas por tipo: ATIVOS, CANCELADOS ou TODOS
  @Get('assinaturas/:tipo')
  @Bind(Param())
  async listarAssinaturasTipo(params) {
    return await this.listarAssinaturasTipoUC.run(params.tipo.toUpperCase());
  }

  // Retorna assinaturas de um cliente específico
  @Get('assinaturascliente/:codcli')
  @Bind(Param())
  async listarAssinaturasCliente(params) {
    return await this.listarAssinaturasClienteUC.run(params.codcli);
  }

  // Retorna assinaturas de um plano específico
  @Get('assinaturasplano/:codplano')
  @Bind(Param())
  async listarAssinaturasPlano(params) {
    return await this.listarAssinaturasPlanoUC.run(params.codplano);
  }
}
