import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProgressoCandidatoService } from '../services/progressoDoCandidato.service';

@ApiTags('Progresso do Candidato')
@Controller('progresso-candidato')
export class ProgressoCandidatoController {
  constructor(private readonly progressoCandidatoService: ProgressoCandidatoService) {}

  @Post('criar')
  @ApiOperation({ summary: 'Cria um novo progresso para o candidato' })
  @ApiBody({
    schema: {
      properties: {
        aplicacaoId: { type: 'number', description: 'ID da aplicação associada' },
        faseId: { type: 'number', description: 'ID da fase associada' },
        status: { type: 'string', description: 'Status atual do progresso do candidato' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Progresso do candidato criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de validação dos parâmetros.' })
  async criarProgresso(
    @Body('aplicacaoId') aplicacaoId: number,
    @Body('faseId') faseId: number,
    @Body('status') status: string,
  ) {
    return await this.progressoCandidatoService.criarProgresso(aplicacaoId, faseId, status);
  }

  @Get('aplicacao/:id')
  @ApiOperation({ summary: 'Busca progresso por aplicação' })
  @ApiParam({ name: 'id', description: 'ID da aplicação', type: 'number' })
  @ApiResponse({ status: 200, description: 'Progresso do candidato encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Progresso do candidato não encontrado.' })
  async buscarProgressoPorAplicacao(@Param('id') aplicacaoId: number) {
    return await this.progressoCandidatoService.buscarProgressoPorAplicacao(aplicacaoId);
  }

  @Get('fase/:id')
  @ApiOperation({ summary: 'Busca progresso por fase' })
  @ApiParam({ name: 'id', description: 'ID da fase', type: 'number' })
  @ApiResponse({ status: 200, description: 'Progresso do candidato encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Progresso do candidato não encontrado.' })
  async buscarProgressoPorFase(@Param('id') faseId: number) {
    return await this.progressoCandidatoService.buscarProgressoPorFase(faseId);
  }
}
