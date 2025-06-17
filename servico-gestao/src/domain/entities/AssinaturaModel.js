import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

// Entidade que representa uma assinatura
@Entity()
export class AssinaturaModel {
  // Gera automaticamente o ID da assinatura
  @PrimaryGeneratedColumn({ type: 'int' })
  codigo;

  @Column({ type: 'int' })
  codPlano;

  @Column({ type: 'int' })
  codCli;

  @Column({ type: 'datetime' })
  inicioFidelidade;

  @Column({ type: 'datetime' })
  fimFidelidade;

  @Column({ type: 'datetime' })
  dataUltimoPagamento;

  @Column({ type: 'float' })
  custoFinal;

  @Column({ type: 'varchar', length: 255 })
  descricao;

  constructor(codigo, codPlano, codCli, inicio, fim, pagamento, custo, descricao) {
    this.codigo = codigo;
    this.codPlano = codPlano;
    this.codCli = codCli;
    this.inicioFidelidade = inicio;
    this.fimFidelidade = fim;
    this.dataUltimoPagamento = pagamento;
    this.custoFinal = custo;
    this.descricao = descricao;
  }

  //Método para verificar se a assinatura está ativa ou não
  isAtiva() {
    const hoje = new Date();
    const dataPagamento = new Date(this.dataUltimoPagamento);
    const diffEmDias = Math.floor((hoje - dataPagamento) / (1000 * 60 * 60 * 24)); //Converte resultado para dias
    return diffEmDias <= 30; //Ao retornar true, a liença está ativa
  }
}
