import { Controller, Post, Body, Put, Param, Get, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ProgressoCandidatoService } from '../services/progressoCandidato.service';
import { AplicacaoService } from '../../aplicacoes/services/aplicacao.service';
import { FaseService } from '../../fase/services/fase.service';
import { ProgressoCandidato } from '../entities/progressoCandidato.entity';

@ApiTags('Progresso Candidato')
@Controller('progresso-candidato')
export class ProgressoCandidatoController {
  constructor(
    private readonly progressoService: ProgressoCandidatoService,
    private readonly aplicacaoService: AplicacaoService,
    private readonly faseService: FaseService,
  ) {}

  // Endpoint para registrar um novo progresso de candidato em uma fase
  @Post('registrar')
  @ApiOperation({ summary: 'Registrar um novo progresso de candidato em uma fase' })
  @ApiResponse({ status: 201, description: 'Progresso registrado com sucesso', type: ProgressoCandidato })
  @ApiResponse({ status: 404, description: 'Aplicação ou fase não encontrada' })
  @ApiBody({
    schema: {
      properties: {
        aplicacaoId: { type: 'number', description: 'ID da aplicação associada' },
        faseId: { type: 'number', description: 'ID da fase associada' },
        status: {
          type: 'string',
          enum: ['pendente', 'em_andamento', 'concluido', 'reprovado'],
          description: 'Status do progresso',
        },
      },
    },
  })
  async registrarProgresso(
    @Body('aplicacaoId') aplicacaoId: number,
    @Body('faseId') faseId: number,
    @Body('status') status: 'pendente' | 'em_andamento' | 'concluido' | 'reprovado',
  ): Promise<ProgressoCandidato> {
    const aplicacao = await this.aplicacaoService.buscarAplicacaoPorId(aplicacaoId);
    if (!aplicacao) {
      throw new NotFoundException(`Aplicação com ID ${aplicacaoId} não encontrada`);
    }

    const fase = await this.faseService.buscarFasePorId(faseId);
    if (!fase) {
      throw new NotFoundException(`Fase com ID ${faseId} não encontrada`);
    }

    return this.progressoService.registrarProgresso(aplicacao, fase, status);
  }

  // Endpoint para atualizar o status de um progresso de candidato
  @Put('atualizar/:id')
  @ApiOperation({ summary: 'Atualizar o status de um progresso de candidato' })
  @ApiResponse({ status: 200, description: 'Progresso atualizado com sucesso', type: ProgressoCandidato })
  @ApiResponse({ status: 404, description: 'Progresso com ID não encontrado' })
  @ApiParam({ name: 'id', description: 'ID do progresso a ser atualizado' })
  @ApiBody({
    schema: {
      properties: {
        status: {
          type: 'string',
          enum: ['pendente', 'em_andamento', 'concluido', 'reprovado'],
          description: 'Novo status do progresso',
        },
      },
    },
  })
  async atualizarProgresso(
    @Param('id') id: number,
    @Body('status') status: 'pendente' | 'em_andamento' | 'concluido' | 'reprovado',
  ): Promise<ProgressoCandidato> {
    return this.progressoService.atualizarProgresso(id, status);
  }

  // Endpoint para listar o progresso de um candidato em uma aplicação específica
  @Get('listar/:aplicacaoId')
  @ApiOperation({ summary: 'Listar o progresso de um candidato em uma aplicação específica' })
  @ApiResponse({ status: 200, description: 'Lista de progresso do candidato', type: [ProgressoCandidato] })
  @ApiParam({ name: 'aplicacaoId', description: 'ID da aplicação para listar o progresso' })
  async listarProgressoPorAplicacao(@Param('aplicacaoId') aplicacaoId: number): Promise<ProgressoCandidato[]> {
    return this.progressoService.listarProgressoPorAplicacao(aplicacaoId);
  }
}
