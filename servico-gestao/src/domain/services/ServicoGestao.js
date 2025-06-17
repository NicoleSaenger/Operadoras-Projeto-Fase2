import { Injectable } from '@nestjs/common';

//Serviço principal do sistema
@Injectable()
export class ServicoGestao {
  constructor(repositorioCliente, repositorioPlano, repositorioAssinatura) {

    this.repositorioCliente = repositorioCliente;
    this.repositorioPlano = repositorioPlano;
    this.repositorioAssinatura = repositorioAssinatura;
  }

  // --- CLIENTES ---

  // Retorna todos os clientes cadastrados
  async listarClientes() {
    return await this.repositorioCliente.todos();
  }

  // Cadastra um novo cliente
  async cadastraCliente(dados) {
    return await this.repositorioCliente.cadastra(dados);
  }

  // Busca um cliente pelo código
  async recuperaClientePorCodigo(codigo) {
    return await this.repositorioCliente.recuperaPorCodigo(codigo);
  }

  
  // Atualiza os dados de um cliente
  async atualizaCliente(clienteAtualizado) {
    return await this.repositorioCliente.atualiza(clienteAtualizado);
  }


  // --- PLANOS ---

  
  // Retorna todos os planos cadastrados
  async listarPlanos() {
    return await this.repositorioPlano.todos();
  }

  
  // Cadastra um novo plano
  async cadastraPlano(dados) {
    const plano = {
      codigo: dados.codigo,
      nome: dados.nome,
      custoMensal: dados.custoMensal,
      data: new Date(),
      descricao: dados.descricao
    };
    return await this.repositorioPlano.cadastra(plano);
  }

  
  // Atualiza o custo mensal de um plano
  async atualizarCustoPlano(codigo, novoCusto) {
    const plano = await this.repositorioPlano.recuperaPorCodigo(codigo);
    if (!plano) throw new Error('Plano não encontrado');

    plano.custoMensal = novoCusto;
    plano.data = new Date();

    return await this.repositorioPlano.atualiza(plano);
  }


  // --- ASSINATURAS ---

  
  // Retorna todas as assinaturas
  async listarAssinaturas() {
    return await this.repositorioAssinatura.todos();
  }

  // Cadastra uma nova assinatura com fidelidade de 1 ano
  async cadastrarAssinatura(dados) {
    const hoje = new Date();
    const fim = new Date(hoje);
    fim.setDate(fim.getDate() + 365);

    const assinatura = {
      codPlano: dados.codPlano,
      codCli: dados.codCli,
      inicioFidelidade: hoje,
      fimFidelidade: fim,
      dataUltimoPagamento: hoje,
      custoFinal: dados.custoFinal,
      descricao: dados.descricao
    };

    return await this.repositorioAssinatura.cadastra(assinatura);
  }

  
  // Lista assinaturas por tipo: ATIVOS, CANCELADOS ou TODOS
  async listarAssinaturasPorTipo(tipo) {
    const todas = await this.repositorioAssinatura.todos();

    // Atualiza o campo tipo de cada assinatura com base na regra de negócio
    for (const assinatura of todas) {
      assinatura.tipo = assinatura.isAtiva() ? 'ATIVOS' : 'CANCELADOS';
    }

    if (tipo === 'TODOS') return todas;
    
    return todas.filter(assinatura => assinatura.tipo === tipo);
  }


  // Lista assinaturas de um cliente específico com status
  async listarAssinaturasDoCliente(codCli) {
    const assinaturas = await this.repositorioAssinatura.listarPorCliente(codCli);
    
    return assinaturas.map(a => ({
      codigo: a.codigo,
      codCli: a.codCli,
      codPlano: a.codPlano,
      inicioFidelidade: a.inicioFidelidade,
      fimFidelidade: a.fimFidelidade,
      status: a.isAtiva() ? 'ATIVO' : 'CANCELADO'
    }));
  }

  
  // Lista assinaturas de um plano específico com status
  async listarAssinaturasDoPlano(codPlano) {
    const assinaturas = await this.repositorioAssinatura.listarPorPlano(codPlano);
    
    return assinaturas.map(a => ({
      codigo: a.codigo,
      codCli: a.codCli,
      codPlano: a.codPlano,
      inicioFidelidade: a.inicioFidelidade,
      fimFidelidade: a.fimFidelidade,
      status: a.isAtiva() ? 'ATIVO' : 'CANCELADO'
    }));
  }
}
