// Importa decoradores e dependências do NestJS
import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

// Importa a entidade e interface necessárias
import { ClienteModel } from '../../domain/entities/ClienteModel.js';
import { IClienteModelRepository } from '../../domain/repositories/IClienteModelRepository.js';

// Implementação concreta do repositório usando TypeORM
@Injectable()
@Dependencies(getRepositoryToken(ClienteModel))
export class TypeormClienteRepository extends IClienteModelRepository {
  #repo;

  constructor(repo) {
    super();
    this.#repo = repo; // Injeção da dependência do repositório
  }

  // Retorna todos os métodos dos clientes
  async todos() {
    return await this.#repo.find();
  }

  async cadastra(cliente) {
    return await this.#repo.save(cliente);
  }

  async recuperaPorCodigo(codigo) {
    return await this.#repo.findOneBy({ codigo });
  }

  async atualiza(clienteAtualizado) {
    return await this.#repo.save(clienteAtualizado);
  }
}
