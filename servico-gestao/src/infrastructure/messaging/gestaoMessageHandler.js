import { Controller, Dependencies } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

//Importa todos os casos de uso relacionados aos endpoints do servico-gestao
import { ListarClientes_UC } from '../../application/use-cases/ListarClientes_UC.js';
import { ListarPlanos_UC } from '../../application/use-cases/ListarPlanos_UC.js';
import { AtualizarCustoPlano_UC } from '../../application/use-cases/AtualizarCustoPlano_UC.js';
import { CadastrarAssinatura_UC } from '../../application/use-cases/CadastrarAssinatura_UC.js';
import { ListarAssinaturasPorTipo_UC } from '../../application/use-cases/ListarAssinaturasPorTipo_UC.js';
import { ListarAssinaturasDoCliente_UC } from '../../application/use-cases/ListarAssinaturasDoCliente_UC.js';
import { ListarAssinaturasDoPlano_UC } from '../../application/use-cases/ListarAssinaturasDoPlano_UC.js';

// Define o controller responsável por lidar com as mensagens do servico-gestao
@Controller()
@Dependencies(
  ListarClientes_UC,
  ListarPlanos_UC,
  AtualizarCustoPlano_UC,
  CadastrarAssinatura_UC,
  ListarAssinaturasPorTipo_UC,
  ListarAssinaturasDoCliente_UC,
  ListarAssinaturasDoPlano_UC
)
export class GestaoMessageHandler {
  constructor(
    listarClientesUC,
    listarPlanosUC,
    atualizarCustoPlanoUC,
    cadastrarAssinaturaUC,
    listarAssinaturasPorTipoUC,
    listarAssinaturasDoClienteUC,
    listarAssinaturasDoPlanoUC
  ) {
    this.listarClientesUC = listarClientesUC;
    this.listarPlanosUC = listarPlanosUC;
    this.atualizarCustoPlanoUC = atualizarCustoPlanoUC;
    this.cadastrarAssinaturaUC = cadastrarAssinaturaUC;
    this.listarAssinaturasPorTipoUC = listarAssinaturasPorTipoUC;
    this.listarAssinaturasDoClienteUC = listarAssinaturasDoClienteUC;
    this.listarAssinaturasDoPlanoUC = listarAssinaturasDoPlanoUC;
  }

  //Define os métodos que serão chamados quando uma mensagem for recebida
  @MessagePattern('listar_clientes')
  async listarClientes() {
    return await this.listarClientesUC.run();
  }

  @MessagePattern('listar_planos')
  async listarPlanos() {
    return await this.listarPlanosUC.run();
  }

  @MessagePattern('atualizar_custo_plano')
  async atualizarCusto(payload) {
    const { idPlano, custoMensal } = payload;
    return await this.atualizarCustoPlanoUC.run(parseInt(idPlano), custoMensal);
  }

  @MessagePattern('cadastrar_assinatura')
  async cadastrarAssinatura(payload) {
    const { codCli, codPlano, custoFinal, descricao } = payload;
    return await this.cadastrarAssinaturaUC.run(codCli, codPlano, custoFinal, descricao);
  }

  @MessagePattern('listar_assinaturas_tipo')
  async listarAssinaturasTipo(payload) {
    const tipo = (payload?.tipo || '').toUpperCase();
    return await this.listarAssinaturasPorTipoUC.run(tipo);
  }

  @MessagePattern('listar_assinaturas_cliente')
  async listarAssinaturasCliente(payload) {
    return await this.listarAssinaturasDoClienteUC.run(payload.codcli);
  }

  @MessagePattern('listar_assinaturas_plano')
  async listarAssinaturasPlano(payload) {
    return await this.listarAssinaturasDoPlanoUC.run(payload.codplano);
  }
}
