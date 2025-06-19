import { Controller, Get, Bind, Param, Dependencies } from '@nestjs/common';
import { firstValueFrom, timeout } from 'rxjs';
import { AssinaturasService } from '../../domain/services/assinaturas.service.js';

//Controlador responsável por verificar se uma assinatura está ativa
@Controller('planosativos')
@Dependencies(AssinaturasService, 'GESTAO_SERVICE')
export class AssinaturasController {
  constructor(assinaturasService, gestaoClient) {
    this.assinaturasService = assinaturasService;
    this.gestaoClient = gestaoClient;
  }

  //Rota GET que recebe o código da assinatura e verifica se está ativa
  @Get(':codAss')
  @Bind(Param())
  async isAtiva(params) {
    const codAss = params.codAss;

    //Primeiro tenta verificar no cache local
    let ativo = this.assinaturasService.isActive(codAss);

    //Se não estiver no cache, consulta o serviço de gestão
    if (!ativo) {
      try {
        const resposta = await firstValueFrom(
            this.gestaoClient.send('consultar_assinatura_valida', codAss).pipe( // Envia evento para o serviço de gestão
            timeout(5000) //Timeout de 5 segundos para evitar travamento
            )
        );

        //Considera ativa se a resposta for true
        ativo = resposta === true;

        // Se estiver ativa, adiciona ao cache
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
