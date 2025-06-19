import { Entity, Column, PrimaryColumn } from 'typeorm';

//Entidade que representa um plano
@Entity()
export class PlanoModel {
  @PrimaryColumn({ type: 'int' })
  codigo;

  @Column({ type: 'varchar', length: 100 })
  nome;

  @Column({ type: 'float' })
  custoMensal;

  @Column({ type: 'datetime' })
  data;

  @Column({ type: 'varchar', length: 255 })
  descricao;

  constructor(codigo, nome, custoMensal, data, descricao) {
    this.codigo = codigo;
    this.nome = nome;
    this.custoMensal = custoMensal;
    this.data = data;
    this.descricao = descricao;
  }
}
