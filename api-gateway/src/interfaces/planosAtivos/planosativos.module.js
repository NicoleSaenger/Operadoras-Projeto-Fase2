// src/modules/planosativos.module.js
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PlanosAtivosController } from './planosativos.controller.js';

@Module({
  imports: [HttpModule],
  controllers: [PlanosAtivosController],
})
export class PlanosAtivosModule {}
