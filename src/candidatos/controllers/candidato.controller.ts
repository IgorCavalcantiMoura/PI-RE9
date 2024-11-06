import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
  ApiParam,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CandidatoService } from '../services/candidato.service';
import { Candidato } from '../entities/candidato.entity';
import { Response } from 'express';

const fileTypes = ['application/pdf'];

@ApiTags('Candidatos')
@ApiBearerAuth()
@Controller('candidatos')
@UseGuards(JwtAuthGuard)
export class CandidatoController {
  constructor(private readonly candidatoService: CandidatoService) {}

  @ApiOperation({ summary: 'Cadastrar um novo candidato' })
  @ApiResponse({
    status: 201,
    description: 'Candidato cadastrado com sucesso',
    type: Candidato,
  })
  @Post('cadastrar')
  async cadastrar(
    @Body() candidatoData: Omit<Candidato, 'id'>,
  ): Promise<Candidato> {
    return this.candidatoService.criarCandidato(candidatoData);
  }

  @ApiOperation({ summary: 'Upload de currículo do candidato' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'ID do candidato' })
  @ApiBody({
    description: 'Arquivo de currículo em formato PDF',
    schema: {
      type: 'object',
      properties: {
        curriculo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Currículo enviado com sucesso' })
  @Post(':id/curriculo')
  @UseInterceptors(
    FileInterceptor('curriculo', {
      fileFilter: (req, file, callback) => {
        if (!fileTypes.includes(file.mimetype)) {
          return callback(
            new BadRequestException(
              'Tipo de arquivo não permitido. Apenas PDFs são aceitos.',
            ),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // Limite de 5 MB
      },
    }),
  )
  async uploadCurriculo(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.candidatoService.salvarCurriculo(id, file);
  }

  @ApiOperation({ summary: 'Buscar todos os candidatos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos os candidatos',
    type: [Candidato],
  })
  @Get()
  async buscarTodos(): Promise<Candidato[]> {
    return this.candidatoService.buscarTodos();
  }

  @ApiOperation({ summary: 'Buscar candidato por ID' })
  @ApiParam({ name: 'id', description: 'ID do candidato' })
  @ApiResponse({
    status: 200,
    description: 'Candidato encontrado',
    type: Candidato,
  })
  @ApiResponse({ status: 404, description: 'Candidato não encontrado' })
  @Get(':id')
  async buscarPorId(@Param('id') id: number): Promise<Candidato> {
    return this.candidatoService.buscarPorId(id);
  }

  @ApiOperation({ summary: 'Deletar candidato por ID' })
  @ApiParam({ name: 'id', description: 'ID do candidato' })
  @ApiResponse({ status: 200, description: 'Candidato deletado com sucesso' })
  @Delete(':id')
  async deletarCandidato(@Param('id') id: number): Promise<void> {
    await this.candidatoService.deletarCandidato(id);
  }

  @ApiOperation({ summary: 'Baixar currículo do candidato' })
  @ApiParam({ name: 'id', description: 'ID do candidato' })
  @ApiResponse({
    status: 200,
    description: 'Currículo do candidato',
    content: { 'application/pdf': {} },
  })
  @ApiResponse({ status: 404, description: 'Currículo não encontrado' })
  @Get(':id/curriculo')
  async baixarCurriculo(@Param('id') id: number, @Res() res: Response) {
    const candidato = await this.candidatoService.buscarPorId(id);

    if (!candidato || !candidato.curriculo) {
      return res.status(404).send('Currículo não encontrado');
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="curriculo-${candidato.nome}.pdf"`,
    });

    res.send(candidato.curriculo);
  }
}
