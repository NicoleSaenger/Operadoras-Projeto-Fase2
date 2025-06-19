import { Controller, Post, Body, Dependencies, Res, Bind } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

//Importa o serviço HTTP do NestJS baseado em Axios
import { HttpService } from '@nestjs/axios';


//Controller responsável por encaminhar requisições relacionadas ao faturamento para o servico-faturamento
@Controller()
@Dependencies(HttpService)
export class FaturamentoController {
  constructor(httpService) {
    this.httpService = httpService; // Armazena o serviço HTTP para uso no método
  }

  //Método para registrar um pagamento
  @Post('registrarpagamento')
  @Bind(Body(), Res())
  async registrarPagamento(body, res) {
    try {
      //Encaminha o corpo da requisição para o servico-faturamento via HTTP
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:3002/faturamento/registrarpagamento', body)
      );

      //Retorna a resposta original do servico-faturamento
      return res.status(response.status).json(response.data);
    } catch (error) {
      //Em caso de erro na requisição, registra no terminal e retorna erro padrão
      console.error('[X] Erro ao encaminhar requisição para servico-faturamento:', error.message);
      const status = error?.response?.status || 502;
      const data = error?.response?.data || {
        erro: true,
        mensagem: 'Erro ao comunicar com o serviço de faturamento',
      };

      //Retorna o status e a mensagem de erro
      return res.status(status).json(data);
    }
  }
}
