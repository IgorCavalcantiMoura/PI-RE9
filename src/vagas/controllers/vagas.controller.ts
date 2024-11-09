import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { Vaga } from '../entities/vagas.entity';
import { VagaService } from '../services/vagas.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@Controller('vagas')
@ApiTags('Vagas')
export class VagaController {
  constructor(private readonly vagaService: VagaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova vaga' })
  @ApiBody({ type: Vaga, description: 'Informações da nova vaga' })
  @ApiResponse({
    status: 201,
    description: 'Vaga criada com sucesso',
    type: Vaga,
  })
  async createVaga(@Body() vagaData: Partial<Vaga>): Promise<Vaga> {
    return this.vagaService.createVaga(vagaData);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as vagas' })
  @ApiResponse({ status: 200, description: 'Lista de vagas', type: [Vaga] })
  async findAll(): Promise<Vaga[]> {
    return this.vagaService.findAll();
  }

  
  @Get('nearby')
  @ApiOperation({ summary: 'Buscar vagas próximas a um CEP' })
  @ApiQuery({ name: 'cep', type: 'string', description: 'CEP de referência' })
  @ApiQuery({
    name: 'distance',
    type: 'number',
    description: 'Distância máxima em quilômetros',
  })
  @ApiResponse({
    status: 200,
    description: 'Vagas próximas ao CEP',
    type: [Vaga],
  })
  @ApiResponse({ status: 404, description: 'Vagas não encontradas' })
  async findNearbyCep(
    @Query('cep') referenceCep: string,
    @Query('maxDistance') maxDistance: number,
  ): Promise<Vaga[]> {
    return this.vagaService.findNearbyCep(referenceCep, maxDistance);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma vaga pelo ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da vaga' })
  @ApiResponse({ status: 200, description: 'Vaga encontrada', type: Vaga })
  @ApiResponse({ status: 404, description: 'Vaga não encontrada' })
  async findVagaById(@Param('id') id: number): Promise<Vaga> {
    return this.vagaService.findVagaById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma vaga existente' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da vaga' })
  @ApiBody({ type: Vaga, description: 'Dados para atualização da vaga' })
  @ApiResponse({ status: 200, description: 'Vaga atualizada', type: Vaga })
  @ApiResponse({ status: 404, description: 'Vaga não encontrada' })
  async updateVaga(
    @Param('id') id: number,
    @Body() vagaData: Partial<Vaga>,
  ): Promise<Vaga> {
    return this.vagaService.updateVaga(id, vagaData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma vaga' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da vaga' })
  @ApiResponse({ status: 204, description: 'Vaga deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Vaga não encontrada' })
  async deletarVaga(@Param('id') id: number): Promise<void> {
    await this.vagaService.deletarVaga(id);
  }
}
