import { Injectable } from '@nestjs/common';

//Serviço responsável por manter em cache as assinaturas ativas
@Injectable()
export class AssinaturasService {
  constructor() {
    //Inicializa um cache local usando Map, que armazena codAss como chave
    this.cache = new Map();
  }

  //Verifica se uma assinatura está ativa (presente no cache)
  isActive(codAss) {
    return this.cache.has(codAss); 
  }

  // Adiciona uma assinatura ao cache, marcando como ativa
  add(codAss) {
    this.cache.set(codAss, true);
  }

  //Remove uma assinatura do cache após pagamento
  remove(codAss) {
    this.cache.delete(codAss); 
  }
}
