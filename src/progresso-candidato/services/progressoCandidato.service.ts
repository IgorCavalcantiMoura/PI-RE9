import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgressoCandidato } from '../entities/progressoCandidato.entity';
import { Aplicacao } from '../../aplicacoes/entities/aplicacao.entity';
import { Fase } from '../../fase/entities/fase.entity';


@Injectable()
export class ProgressoCandidatoService {
  constructor(
    @InjectRepository(ProgressoCandidato)
    private readonly progressoRepository: Repository<ProgressoCandidato>,
  ) {}

  async registrarProgresso(
    aplicacao: Aplicacao,
    fase: Fase,
    status: 'pendente' | 'em_andamento' | 'concluido' | 'reprovado',
  ): Promise<ProgressoCandidato> {
    const progresso = this.progressoRepository.create({ aplicacao, fase, status });
    return await this.progressoRepository.save(progresso);
  }

  async atualizarProgresso(id: number, status: 'pendente' | 'em_andamento' | 'concluido' | 'reprovado'): Promise<ProgressoCandidato> {
    const progresso = await this.progressoRepository.preload({ id, status });
    if (!progresso) {
      throw new NotFoundException(`Progresso com ID ${id} não encontrado`);
    }
    return this.progressoRepository.save(progresso);
  }

  async listarProgressoPorAplicacao(aplicacaoId: number): Promise<ProgressoCandidato[]> {
    return await this.progressoRepository.find({ where: { aplicacao: { id: aplicacaoId } }, relations: ['fase'] });
  }
}
