// src/modules/planosativos.module.js
import { Module } from '@nestjs/common';
import { PlanosAtivosController } from './planosativos.controller.js';

// Importa o serviço HTTP do NestJS baseado em Axios
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule], // Importa o HttpModule para permitir requisições HTTP
  controllers: [PlanosAtivosController], // Declara o controller dos planos ativos
})
export class PlanosAtivosModule {}
