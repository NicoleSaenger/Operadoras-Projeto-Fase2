import { Controller, Get, Param, Bind, Dependencies } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AssinaturasService } from '../domain/assinaturas.service.js';

@Controller('planosativos')
@Dependencies(AssinaturasService, 'GESTAO_SERVICE')
export class AssinaturasController {
  constructor(assinaturasService, gestaoClient) {
    this.assinaturasService = assinaturasService;
    this.gestaoClient = gestaoClient;
  }

  @Get(':codass')
  @Bind(Param())
  async isAtiva(params) {
    const codass = params.codass;

    let ativo = this.assinaturasService.isActive(codass);

    if (!ativo) {
      const resposta = await firstValueFrom(
        this.gestaoClient.send('consultar_assinatura_valida', codass)
      );

      if (resposta === true) {
        this.assinaturasService.add(codass);
        ativo = true;
      }
    }

    return ativo; // resposta como booleano puro, conforme exigência da Fase 2
  }
}
