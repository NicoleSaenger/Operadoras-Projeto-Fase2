import { Entity, Column, PrimaryColumn } from 'typeorm';

// Entidade que representa um cliente
@Entity()
export class ClienteModel {
  @PrimaryColumn({ type: 'int' })
  codigo;

  @Column({ type: 'varchar', length: 100 })
  nome;

  @Column({ type: 'varchar', length: 100 })
  email;

  constructor(codigo, nome, email) {
    this.codigo = codigo;
    this.nome = nome;
    this.email = email;
  }
}
