import { Controller, Dependencies } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AssinaturasService } from '../domain/assinaturas.service.js';

@Controller()
@Dependencies(AssinaturasService)
export class PagamentoHandler {
  constructor(assinaturasService) {
    this.assinaturasService = assinaturasService;
  }

  @MessagePattern('pagamento.registrado')
  async handlePagamento(payload) {
    try {
      const codAss = payload.codAss;
      if (codAss) {
        console.log(`[✔] Evento de pagamento recebido para assinatura ${codAss}. Limpando cache...`);
        this.assinaturasService.remove(codAss);
      }
    } catch (err) {
      console.error('[X] Erro ao processar evento de pagamento:', err.message);
    }
  }
}
