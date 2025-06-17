// Importa decoradores e dependências do NestJS
import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

// Importa a entidade e interface necessárias
import { AssinaturaModel } from '../../domain/entities/AssinaturaModel.js';
import { IAssinaturaModelRepository } from '../../domain/repositories/IAssinaturaModelRepository.js';

// Implementação concreta do repositório usando TypeORM
@Injectable()
@Dependencies(getRepositoryToken(AssinaturaModel))
export class TypeormAssinaturaRepository extends IAssinaturaModelRepository {
  #repo;

  constructor(repo) {
    super();
    this.#repo = repo; // Injeção da dependência do repositório
  }

  // Retorna todos os métodos das assinaturas
  async todos() {
    return await this.#repo.find();
  }

  async cadastra(assinatura) {
    return await this.#repo.save(assinatura);
  }

  async recuperaPorCodigo(codigo) {
    return await this.#repo.findOneBy({ codigo });
  }

  async listarPorCliente(codCli) {
    return await this.#repo.findBy({ codCli });
  }

  async listarPorPlano(codPlano) {
    return await this.#repo.findBy({ codPlano });
  }

  async atualiza(assinatura) {
    return await this.#repo.save(assinatura);
  }
}
