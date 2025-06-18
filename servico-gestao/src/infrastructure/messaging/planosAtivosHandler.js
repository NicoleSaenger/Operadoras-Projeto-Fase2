import { Controller, Dependencies } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { VerificarAssinaturaAtiva_UC } from '../../application/use-cases/VerificarAssinaturaAtiva_UC.js';

@Controller()
@Dependencies(VerificarAssinaturaAtiva_UC)
export class PlanosAtivosHandler {
  constructor(verificarAssinaturaAtivaUC) {
    this.verificarAssinaturaAtivaUC = verificarAssinaturaAtivaUC;
  }

  @MessagePattern('consultar_assinatura_valida')
  async verificarAssinaturaAtiva(codAss) {
    console.log(`[→] Recebido pedido para verificar assinatura ${codAss}`);
    return this.verificarAssinaturaAtivaUC.run(codAss);
  }
}
