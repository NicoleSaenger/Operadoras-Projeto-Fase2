import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

//Entidade que representa um pagamento
@Entity()
export class PagamentoModel {
  
  //Gera automaticamente o ID do pagamento
  @PrimaryGeneratedColumn({ type: 'int' })
  codigo;

  @Column({ type: 'int' })
  codAss;

  @Column({ type: 'float' })
  valorPago;

  @Column({ type: 'datetime' })
  dataPagamento;

  constructor(codigo, codAss, valorPago, dataPagamento ) {
    this.codigo = codigo;
    this.codAss = codAss;
    this.valorPago = valorPago;
    this.dataPagamento = dataPagamento;
  }
}
