import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { AplicacaoService } from '../services/aplicacao.service';
import { Aplicacao } from '../entities/aplicacao.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Aplicacoes')
@Controller('aplicacoes')
export class AplicacaoController {
  constructor(private readonly aplicacaoService: AplicacaoService) {}

  @ApiOperation({ summary: 'Criar uma nova aplicação' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        candidatoId: { type: 'number', description: 'ID do candidato' },
        vagaId: { type: 'number', description: 'ID da vaga' },
      },
      required: ['candidatoId', 'vagaId'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Aplicação criada com sucesso',
    type: Aplicacao,
  })
  @Post()
  async createAplicacao(
    @Body('candidatoId') candidatoId: number,
    @Body('vagaId') vagaId: number,
  ): Promise<Aplicacao> {
    return this.aplicacaoService.createAplicacao(candidatoId, vagaId);
  }

  @ApiOperation({ summary: 'Listar todas as aplicações' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas as aplicações',
    type: [Aplicacao],
  })
  @Get()
  async findAll(): Promise<Aplicacao[]> {
    return this.aplicacaoService.findAll();
  }

  @ApiOperation({ summary: 'Buscar aplicação por ID' })
  @ApiParam({ name: 'id', description: 'ID da aplicação' })
  @ApiResponse({
    status: 200,
    description: 'Dados da aplicação encontrada',
    type: Aplicacao,
  })
  @ApiResponse({ status: 404, description: 'Aplicação não encontrada' })
  @Get(':id')
  async findAplicacaoById(@Param('id') id: number): Promise<Aplicacao> {
    return this.aplicacaoService.findAplicacaoById(id);
  }

  @ApiOperation({ summary: 'Deletar uma aplicação' })
  @ApiParam({ name: 'id', description: 'ID da aplicação' })
  @ApiResponse({ status: 204, description: 'Aplicação deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Aplicação não encontrada' })
  @Delete(':id')
  async deleteAplicacao(@Param('id') id: number): Promise<void> {
    await this.aplicacaoService.deleteAplicacao(id);
  }
}
