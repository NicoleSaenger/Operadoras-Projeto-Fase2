// Importa decoradores e dependências do NestJS
import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

// Importa a entidade e interface necessárias
import { PlanoModel } from '../../domain/entities/PlanoModel.js';
import { IPlanoModelRepository } from '../../domain/repositories/IPlanoModelRepository.js';

// Implementação concreta do repositório usando TypeORM
@Injectable()
@Dependencies(getRepositoryToken(PlanoModel))
export class TypeormPlanoRepository extends IPlanoModelRepository {
  #repo;

  constructor(repo) {
    super();
    this.#repo = repo; // Injeção da dependência do repositório
  }

  // Retorna todos os métodos dos planos
  async todos() {
    return await this.#repo.find();
  }

  async cadastra(plano) {
    return await this.#repo.save(plano);
  }

  async recuperaPorCodigo(codigo) {
    return await this.#repo.findOneBy({ codigo });
  }

  async atualiza(planoAtualizado) {
    return await this.#repo.save(planoAtualizado);
  }
}