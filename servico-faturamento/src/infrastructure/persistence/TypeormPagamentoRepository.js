import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

//Importa a entidade do pagamento e a interface do repositório
import { PagamentoModel } from '../../domain/entities/PagamentoModel.js';
import { IPagamentoModelRepository } from '../../domain/repositories/IPagamentoModelRepository.js';

// Implementação do repositório usando TypeORM
@Injectable()
@Dependencies(getRepositoryToken(PagamentoModel))
export class TypeormPagamentoRepository extends IPagamentoModelRepository {
  #repo;

  constructor(repo) {
    super();
    this.#repo = repo; //Injeção do repositório do TypeORM
  }

  //Cadastra um pagamento
  async cadastra(pagamentoModel) {
    return await this.#repo.save(pagamentoModel);
  }

  //Lista todos os pagamentos registrados
  async listarTodos() {
    return await this.#repo.find();
  }
}
