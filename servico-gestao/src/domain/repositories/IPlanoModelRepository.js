// Interface responsável por definir os métodos dos planos
export class IPlanoModelRepository {
  todos() {
    throw new Error('Não implementado');
  }

  cadastra(plano) {
    throw new Error('Não implementado');
  }

  atualiza(planoAtualizado) {
    throw new Error('Não implementado');
  }

  recuperaPorCodigo(codigo) {
    throw new Error('Não implementado');
  }
}
