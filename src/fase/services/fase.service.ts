import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fase } from '../entities/fase.entity';
import { Vaga } from '../../vagas/entities/vagas.entity';


@Injectable()
export class FaseService {
  constructor(
    @InjectRepository(Fase)
    private readonly faseRepository: Repository<Fase>,
    @InjectRepository(Vaga)
    private readonly vagaRepository: Repository<Vaga>,
  ) {}

  async criarFase(vagaId: number, nome: string, descricao?: string): Promise<Fase> {
    // Busca a vaga pelo ID antes de associá-la à fase
    const vaga = await this.vagaRepository.findOne({ where: { id: vagaId } });
    if (!vaga) {
      throw new NotFoundException(`Vaga com ID ${vagaId} não encontrada`);
    }

    // Cria e salva a nova fase
    const novaFase = this.faseRepository.create({ nome, descricao, vaga });
    return await this.faseRepository.save(novaFase);
  }

  async listarFasesPorVaga(vagaId: number): Promise<Fase[]> {
    return await this.faseRepository.find({ where: { vaga: { id: vagaId } } });
  }

  async atualizarFase(id: number, dadosAtualizados: Partial<Fase>): Promise<Fase> {
    const fase = await this.faseRepository.preload({ id, ...dadosAtualizados });
    if (!fase) {
      throw new NotFoundException(`Fase com ID ${id} não encontrada`);
    }
    return this.faseRepository.save(fase);
  }

  async buscarFasePorId(id: number): Promise<Fase> {
    const fase = await this.faseRepository.findOne({ where: { id } });
    if (!fase) {
      throw new NotFoundException(`Fase com ID ${id} não encontrada`);
    }
    return fase;
  }

  async excluirFase(id: number): Promise<void> {
    const resultado = await this.faseRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Fase com ID ${id} não encontrada`);
    }
  }
}
