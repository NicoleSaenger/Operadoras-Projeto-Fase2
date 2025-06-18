import { Controller, Get, Bind, Param, Dependencies } from '@nestjs/common';
import { firstValueFrom, timeout } from 'rxjs';
import { AssinaturasService } from '../domain/assinaturas.service.js';

@Controller('planosativos')
@Dependencies(AssinaturasService, 'GESTAO_SERVICE')
export class AssinaturasController {
  constructor(assinaturasService, gestaoClient) {
    this.assinaturasService = assinaturasService;
    this.gestaoClient = gestaoClient;
  }

  @Get(':codAss')
  @Bind(Param())
  async isAtiva(params) {
    const codAss = params.codAss;

    let ativo = this.assinaturasService.isActive(codAss);

    if (!ativo) {
      try {
        const resposta = await firstValueFrom(
            this.gestaoClient.send('consultar_assinatura_valida', codAss).pipe(
            timeout(5000) // tempo máximo para aguardar resposta: 5 segundos
            )
        );

        ativo = resposta === true;

        if (ativo) {
            this.assinaturasService.add(codAss);
        }
        } catch (err) {
        console.error(`[X] Erro ao consultar servico-gestao para assinatura ${codAss}:`, err.message);
        ativo = false;
        }
    }

    console.log(`[→] Plano ${codAss} está ativo? ${ativo}`);
    return { codigo: codAss, ativa: ativo };
  }
}
