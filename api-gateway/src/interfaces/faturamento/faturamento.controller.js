import { Controller, Post, Body, Dependencies, Res, Bind } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
@Dependencies(HttpService)
export class FaturamentoController {
  constructor(httpService) {
    this.httpService = httpService;
  }

  @Post('registrarpagamento')
  @Bind(Body(), Res())
  async registrarPagamento(body, res) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:3002/faturamento/registrarpagamento', body)
      );
      return res.status(response.status).json(response.data);
    } catch (error) {
      console.error('[X] Erro ao encaminhar requisição para servico-faturamento:', error.message);
      const status = error?.response?.status || 502;
      const data = error?.response?.data || {
        erro: true,
        mensagem: 'Erro ao comunicar com o serviço de faturamento',
      };
      return res.status(status).json(data);
    }
  }
}
