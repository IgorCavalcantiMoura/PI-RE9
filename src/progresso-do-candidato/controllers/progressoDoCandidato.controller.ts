import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProgressoCandidatoService } from '../services/progressoDoCandidato.service';


@Controller('progresso-candidato')
export class ProgressoCandidatoController {
  constructor(private readonly progressoCandidatoService: ProgressoCandidatoService) {}

  @Post('criar')
  async criarProgresso(
    @Body('aplicacaoId') aplicacaoId: number,
    @Body('faseId') faseId: number,
    @Body('status') status: string,
  ) {
    return await this.progressoCandidatoService.criarProgresso(aplicacaoId, faseId, status);
  }

  @Get('aplicacao/:id')
  async buscarProgressoPorAplicacao(@Param('id') aplicacaoId: number) {
    return await this.progressoCandidatoService.buscarProgressoPorAplicacao(aplicacaoId);
  }

  @Get('fase/:id')
  async buscarProgressoPorFase(@Param('id') faseId: number) {
    return await this.progressoCandidatoService.buscarProgressoPorFase(faseId);
  }
}
