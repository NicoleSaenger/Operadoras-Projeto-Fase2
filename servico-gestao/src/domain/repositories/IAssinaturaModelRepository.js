// Interface responsável por definir os métodos das assinaturas
export class IAssinaturaModelRepository {
  todos() { 
    throw new Error('Não implementado'); 
  }

  cadastra(assinatura) { 
    throw new Error('Não implementado'); 
  }

  recuperaPorCodigo(codigo) { 
    throw new Error('Não implementado'); 
  }

  listarPorCliente(codigoCliente) {
    throw new Error('Não implementado'); 
  }
  listarPorPlano(codigoPlano) { 
    throw new Error('Não implementado');
  }
  
  atualiza(assinatura) { 
    throw new Error('Não implementado'); 
  }
}
