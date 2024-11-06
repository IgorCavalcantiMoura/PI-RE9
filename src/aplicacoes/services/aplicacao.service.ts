import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aplicacao } from '../entities/aplicacao.entity';
import { Candidato } from '../../candidatos/entities/candidato.entity';
import { Vaga } from '../../vagas/entities/vagas.entity';

@Injectable()
export class AplicacaoService {
  constructor(
    @InjectRepository(Aplicacao)
    private aplicacaoRepository: Repository<Aplicacao>,
    @InjectRepository(Candidato)
    private candidatoRepository: Repository<Candidato>,
    @InjectRepository(Vaga)
    private vagaRepository: Repository<Vaga>,
  ) {}

  async createAplicacao(candidatoId: number, vagaId: number): Promise<Aplicacao> {
    // Verifica se o candidato existe
    const candidato = await this.candidatoRepository.findOne({ where: { id: candidatoId } });
    if (!candidato) {
      throw new NotFoundException(`Candidato com ID ${candidatoId} não encontrado`);
    }

    // Verifica se a vaga existe
    const vaga = await this.vagaRepository.findOne({ where: { id: vagaId } });
    if (!vaga) {
      throw new NotFoundException(`Vaga com ID ${vagaId} não encontrada`);
    }

    // Verifica se o candidato já se aplicou à vaga
    const existingAplicacao = await this.aplicacaoRepository.findOne({
      where: {
        candidato: { id: candidatoId },
        vaga: { id: vagaId },
      },
    });
    if (existingAplicacao) {
      throw new ConflictException(`Candidato já se aplicou para a vaga ${vagaId}`);
    }

    const aplicacao = this.aplicacaoRepository.create({ candidato, vaga });
    return this.aplicacaoRepository.save(aplicacao);
  }

  async findAll(): Promise<Aplicacao[]> {
    return this.aplicacaoRepository.find({ relations: ['candidato', 'vaga'] });
  }

  async findAplicacaoById(id: number): Promise<Aplicacao> {
    const aplicacao = await this.aplicacaoRepository.findOne({ where: { id }, relations: ['candidato', 'vaga'] });
    if (!aplicacao) {
      throw new NotFoundException(`Aplicação com ID ${id} não encontrada`);
    }
    return aplicacao;
  }

  async deleteAplicacao(id: number): Promise<void> {
    const resultado = await this.aplicacaoRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Aplicação com ID ${id} não encontrada`);
    }
  }
}
