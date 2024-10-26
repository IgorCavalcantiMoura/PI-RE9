
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmpresasService } from '../services/empresa.service';
import { Empresa } from '../entities/empresa.entity';

@Controller('empresas')
@UseGuards(AuthGuard('jwt')) // Aplica o guard para todas as rotas deste controlador
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() empresa: Partial<Empresa>): Promise<Empresa> {
    return this.empresasService.create(empresa);
  }

  @Get()
  async findAll(): Promise<Empresa[]> {
    return this.empresasService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Empresa> {
    return this.empresasService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() empresaAtualizada: Partial<Empresa>,
  ): Promise<Empresa> {
    return this.empresasService.update(id, empresaAtualizada);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    return this.empresasService.delete(id);
  }
}
