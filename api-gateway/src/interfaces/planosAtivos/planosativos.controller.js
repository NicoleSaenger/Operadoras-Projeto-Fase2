import { Controller, Get, Dependencies, Req, Res, Bind } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
@Dependencies(HttpService)
export class PlanosAtivosController {
  constructor(httpService) {
    this.httpService = httpService;
  }

  @Get('planosativos/:codAss')
  @Bind(Req(), Res())
  async verificarAtividade(req, res) {
    const codAss = req.params.codAss;

    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://localhost:3003/planosativos/${codAss}`)
      );
      return res.status(response.status).json(response.data);
    } catch (error) {
      console.error(`[X] Erro ao consultar servico-planos-ativos para ${codAss}:`, error.message);

      const status = error?.response?.status || 502;
      const data = error?.response?.data || {
        erro: true,
        mensagem: 'Erro ao comunicar com o serviço de planos ativos',
      };

      return res.status(status).json(data);
    }
  }
}
