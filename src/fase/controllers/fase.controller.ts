import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { FaseService } from '../services/fase.service';
import { Fase } from '../entities/fase.entity';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

class CriarFaseDto {
  nome: string;
  descricao?: string;
}

@Controller('fases')
export class FaseController {
  constructor(private readonly faseService: FaseService) {}

  @Post(':vagaId')
  @ApiOperation({ summary: 'Criar uma nova fase para uma vaga' })
  @ApiParam({ name: 'vagaId', description: 'ID da vaga à qual a fase será associada', type: Number })
  @ApiBody({
    description: 'Dados necessários para criar a fase',
    type: CriarFaseDto, // Definindo o DTO com as propriedades nome e descricao
  })
  @ApiResponse({
    status: 201,
    description: 'Fase criada com sucesso',
    type: Fase,
  })
  async criarFase(
    @Param('vagaId') vagaId: number,
    @Body() dados: CriarFaseDto,
  ) {
    return this.faseService.criarFase(vagaId, dados.nome, dados.descricao);
  }

  @Get(':vagaId')
  @ApiOperation({ summary: 'Listar todas as fases de uma vaga' })
  @ApiParam({ name: 'vagaId', description: 'ID da vaga', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Lista de fases da vaga',
    type: [Fase],
  })
  async listarFasesPorVaga(@Param('vagaId') vagaId: number) {
    return this.faseService.listarFasesPorVaga(vagaId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma fase existente' })
  @ApiParam({ name: 'id', description: 'ID da fase a ser atualizada', type: Number })
  @ApiBody({
    description: 'Dados atualizados da fase',
    type: CriarFaseDto, // Usando o mesmo DTO para atualizar a fase
  })
  @ApiResponse({
    status: 200,
    description: 'Fase atualizada com sucesso',
    type: Fase,
  })
  async atualizarFase(
    @Param('id') id: number,
    @Body() dadosAtualizados: CriarFaseDto,
  ) {
    return this.faseService.atualizarFase(id, dadosAtualizados);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma fase' })
  @ApiParam({ name: 'id', description: 'ID da fase a ser excluída', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Fase excluída com sucesso',
  })
  async excluirFase(@Param('id') id: number) {
    return this.faseService.excluirFase(id);
  }
}
