import { Controller, Get, Dependencies, Req, Res, Bind } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

//Importa o serviço de requisições HTTP baseado em Axios
import { HttpService } from '@nestjs/axios';


//Controller responsável por encaminhar requisições relacionadas aos planos ativos para o servico-planos-ativos
@Controller()
@Dependencies(HttpService)
export class PlanosAtivosController {
  constructor(httpService) {
    this.httpService = httpService; //Armazena o serviço HTTP para uso nos métodos
  }

  //Método para verificar se um plano está ativo com base no código da assinatura
  @Get('planosativos/:codAss')
  @Bind(Req(), Res())
  async verificarAtividade(req, res) {
    const codAss = req.params.codAss; //Extrai o código da assinatura da URL

    try {
      //Faz requisição ao microserviço de planos ativos na porta 3003
      const response = await firstValueFrom(
        this.httpService.get(`http://localhost:3003/planosativos/${codAss}`)
      );

      //Retorna a resposta original do microserviço
      return res.status(response.status).json(response.data);
    } catch (error) {
      console.error(`[X] Erro ao consultar servico-planos-ativos para ${codAss}:`, error.message);
    
      // Define uma resposta padrão de erro
      const status = error?.response?.status || 502;
      const data = error?.response?.data || {
        erro: true,
        mensagem: 'Erro ao comunicar com o serviço de planos ativos',
      };

      // Retorna o status e a mensagem de erro
      return res.status(status).json(data);
    }
  }
}
