// domain/assinaturas.service.js
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssinaturasService {
  constructor() {
    this.cache = new Map(); // cache local de assinaturas ativas
  }

  isActive(codAss) {
    return this.cache.has(codAss); // verifica existência no cache
  }

  add(codAss) {
    this.cache.set(codAss, true);  // marca como ativa no cache
  }

  remove(codAss) {
    this.cache.delete(codAss);     // remove do cache
  }
}
