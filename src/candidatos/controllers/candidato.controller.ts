import { Controller, Post, Get, Param, Delete, Body, UseGuards, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
// Supondo que você tenha um guard para autenticação JWT
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CandidatoService } from '../services/candidato.service';
import { Candidato } from '../entities/candidato.entity';
import { Response } from 'express';

const fileTypes = ['application/pdf'];

@Controller('candidatos')
@UseGuards(JwtAuthGuard)
export class CandidatoController {
  constructor(private readonly candidatoService: CandidatoService) {}

  @Post('cadastrar')
  async cadastrar(@Body() candidatoData: Omit<Candidato, 'id'>): Promise<Candidato> {
    return this.candidatoService.criarCandidato(candidatoData);
  }

  @Post(':id/curriculo')
  @UseInterceptors(FileInterceptor('curriculo', {
    fileFilter: (req, file, callback) => {
      // Verifica se o tipo de arquivo é permitido
      if (!fileTypes.includes(file.mimetype)) {
        return callback(new BadRequestException('Tipo de arquivo não permitido. Apenas PDFs são aceitos.'), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // Limite de 5 MB
    },
  }))
  async uploadCurriculo(@Param('id') id: number, @UploadedFile() file: Express.Multer.File): Promise<void> {
    await this.candidatoService.salvarCurriculo(id, file);
  }

  @Get()
  async buscarTodos(): Promise<Candidato[]> {
    return this.candidatoService.buscarTodos();
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: number): Promise<Candidato> {
    return this.candidatoService.buscarPorId(id);
  }

  @Delete(':id')
  async deletarCandidato(@Param('id') id: number): Promise<void> {
    await this.candidatoService.deletarCandidato(id);
  }

  @Get(':id/curriculo')
  async baixarCurriculo(@Param('id') id: number, @Res() res: Response) {
    const candidato = await this.candidatoService.buscarPorId(id);

    if (!candidato || !candidato.curriculo) {
      return res.status(404).send('Currículo não encontrado');
    }

    // Define o tipo de conteúdo e o nome do arquivo
    res.set({
      'Content-Type': 'application/pdf', // Tipo do arquivo
      'Content-Disposition': `attachment; filename="curriculo-${candidato.nome}.pdf"`, // Nome do arquivo para download
    });

    // Envia o Buffer como resposta
    res.send(candidato.curriculo);
  }
}
