// Interface responsável por definir os métodos dos clientes
export class IClienteModelRepository {
  todos() {
    throw new Error('Não implementado');
  }

  cadastra(cliente) {
    throw new Error('Não implementado');
  }

  recuperaPorCodigo(codigo) {
    throw new Error('Não implementado');
  }

  atualiza(cliente) {
    throw new Error('Não implementado');
  }
}
