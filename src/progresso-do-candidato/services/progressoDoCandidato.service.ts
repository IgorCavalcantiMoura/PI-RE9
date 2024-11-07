import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgressoCandidato } from '../entities/progressoDoCandidato.entity';
import { Aplicacao } from '../../aplicacoes/entities/aplicacao.entity';
import { Fase } from '../../fase/entities/fase.entity';

@Injectable()
export class ProgressoCandidatoService {
  constructor(
    @InjectRepository(ProgressoCandidato)
    private readonly progressoRepository: Repository<ProgressoCandidato>,

    @InjectRepository(Aplicacao)
    private readonly aplicacaoRepository: Repository<Aplicacao>,

    @InjectRepository(Fase)
    private readonly faseRepository: Repository<Fase>,
  ) {}

  // Criar progresso para o candidato
  async criarProgresso(aplicacaoId: number, faseId: number, status: string): Promise<ProgressoCandidato> {
    // Buscando aplicação e fase por id
    const aplicacao = await this.aplicacaoRepository.findOne({ where: { id: aplicacaoId } });
    const fase = await this.faseRepository.findOne({ where: { id: faseId } });

    // Validando se foram encontradas
    if (!aplicacao || !fase) {
      throw new Error('Aplicacao ou Fase não encontrados');
    }

    // Criando um novo progresso
    const progresso = this.progressoRepository.create({
      aplicacao,
      fase,
      status,
    });

    // Salvando o novo progresso
    return await this.progressoRepository.save(progresso);
  }

  // Buscar progresso por ID da aplicação
  async buscarProgressoPorAplicacao(aplicacaoId: number): Promise<ProgressoCandidato[]> {
    return await this.progressoRepository.find({
      where: { aplicacao: { id: aplicacaoId } }, // A pesquisa será baseada no ID da aplicação
      relations: ['fase'], // Relacionando com a entidade Fase
    });
  }

  // Buscar progresso por ID da fase
  async buscarProgressoPorFase(faseId: number): Promise<ProgressoCandidato[]> {
    return await this.progressoRepository.find({
      where: { fase: { id: faseId } }, // A pesquisa será baseada no ID da fase
      relations: ['aplicacao'], // Relacionando com a entidade Aplicacao
    });
  }
}
