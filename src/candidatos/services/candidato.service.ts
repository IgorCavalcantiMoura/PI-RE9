import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidato } from '../entities/candidato.entity';



@Injectable()
export class CandidatoService {
  constructor(
    @InjectRepository(Candidato)
    private readonly candidatoRepository: Repository<Candidato>,
  ) {}

  async criarCandidato(candidatoData: Partial<Candidato>): Promise<Candidato> {
    const novoCandidato = this.candidatoRepository.create(candidatoData);
    return this.candidatoRepository.save(novoCandidato);
  }

  async buscarTodos(): Promise<Candidato[]> {
    return this.candidatoRepository.find();
  }

  async buscarPorId(id: number): Promise<Candidato> {
    const candidato = await this.candidatoRepository.findOneBy({ id });
    if (!candidato) {
      throw new NotFoundException(`Candidato com ID ${id} não encontrado.`);
    }
    return candidato;
  }

  async deletarCandidato(id: number): Promise<void> {
    const resultado = await this.candidatoRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Candidato com ID ${id} não encontrado.`);
    }
  }

  async salvarCurriculo(candidatoId: number, curriculo: Express.Multer.File): Promise<void> {
    const candidato = await this.buscarPorId(candidatoId);
    
    candidato.curriculo = curriculo.buffer; // Armazena o conteúdo do PDF como BLOB
    await this.candidatoRepository.save(candidato);
  }
}
