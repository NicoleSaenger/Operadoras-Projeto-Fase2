import { Controller, Post, Body, Dependencies, Bind } from '@nestjs/common';
import { RegistrarPagamento_UC } from '../../application/use-cases/RegistrarPagamento_UC.js';

// Controlador do serviço de faturamento
@Controller('faturamento')
@Dependencies(RegistrarPagamento_UC)
export class FaturamentoController {
  constructor(registrarPagamentoUC) {
    this.registrarPagamentoUC = registrarPagamentoUC;
  }

  // Endpoint responsável por registrar um novo pagamento
  @Post('registrarpagamento')
  @Bind(Body())
  async registrarPagamento(body) {
    const { dataPagamento, codAss, valorPago } = body;

    if (!dataPagamento || !codAss || !valorPago) {
      return {
        statusCode: 400,
        message: 'Parâmetros obrigatórios ausentes.',
      };
    }

    try {
      await this.registrarPagamentoUC.run({ dataPagamento, codAss, valorPago });
      return {
        statusCode: 201,
        message: 'Pagamento registrado com sucesso.',
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Erro ao registrar pagamento: ${error.message}`,
      };
    }
  }
}