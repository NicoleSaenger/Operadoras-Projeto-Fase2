import { Controller, Post, Body, Dependencies, Bind } from '@nestjs/common';

//Importa o caso de uso da aplicação
import { RegistrarPagamento_UC } from '../../application/use-cases/RegistrarPagamento_UC.js';

//Define o controller responsável por lidar com os endpoints de faturamento
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

    //Valida se os parâmetros obrigatórios foram fornecidos
    if (!dataPagamento || !codAss || !valorPago) {
      return {
        statusCode: 400,
        message: '[x] Parâmetros obrigatórios ausentes.',
      };
    }

    try {
      //Chama o caso de uso para registrar o pagamento
      await this.registrarPagamentoUC.run({ dataPagamento, codAss, valorPago });

      return {
        statusCode: 201,
        message: '[✓] Pagamento registrado com sucesso!',
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `[x] Erro ao registrar pagamento: ${error.message}`,
      };
    }
  }
}