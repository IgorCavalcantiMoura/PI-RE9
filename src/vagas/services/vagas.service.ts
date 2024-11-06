import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Vaga } from '../entities/vagas.entity';

@Injectable()
export class VagaService {
  private cepCache = new Map<string, { lat: number; lng: number }>();

  constructor(
    @InjectRepository(Vaga)
    private vagaRepository: Repository<Vaga>,
    private httpService: HttpService,
  ) {}

  async createVaga(vagaData: Partial<Vaga>): Promise<Vaga> {
    const vaga = this.vagaRepository.create(vagaData);
    return this.vagaRepository.save(vaga);
  }

  async findAll(): Promise<Vaga[]> {
    return this.vagaRepository.find();
  }

  async findVagaById(id: number): Promise<Vaga> {
    const vaga = await this.vagaRepository.findOne({ where: { id } });
    if (!vaga) {
      throw new NotFoundException(`Vaga com ID ${id} não encontrada`);
    }
    return vaga;
  }

  async findNearbyCep(referenceCep: string, maxDistance: number): Promise<Vaga[]> {
    const referenceCoordinates = await this.getCoordinatesFromCep(referenceCep);
    const vagas = await this.vagaRepository.find();
    const nearbyVagas = [];

    for (const vaga of vagas) {
      if (vaga.cep) {
        const vagaCoordinates = await this.getCoordinatesFromCep(vaga.cep);
        if (vagaCoordinates) {
          const distance = this.calculateDistance(
            referenceCoordinates.lat,
            referenceCoordinates.lng,
            vagaCoordinates.lat,
            vagaCoordinates.lng,
          );
          if (distance <= maxDistance) {
            nearbyVagas.push(vaga);
          }
        }
      }
    }
    return nearbyVagas;
  }

  async updateVaga(id: number, vagaData: Partial<Vaga>): Promise<Vaga> {
    const vaga = await this.findVagaById(id);
    Object.assign(vaga, vagaData);
    return await this.vagaRepository.save(vaga);
  }

  async deletarVaga(id: number): Promise<void> {
    const resultado = await this.vagaRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Vaga com ID ${id} não encontrada`);
    }
  }

  private async getCoordinatesFromCep(cep: string): Promise<{ lat: number; lng: number }> {
    if (this.cepCache.has(cep)) {
      return this.cepCache.get(cep);
    }

    try {
      const response = await lastValueFrom(
        this.httpService.get(`https://cep.awesomeapi.com.br/json/${cep}`)
      );
      const { lat, lng } = response.data;
      const coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
      this.cepCache.set(cep, coordinates);
      return coordinates;
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao obter coordenadas para o CEP ${cep}`);
    }
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLng = this.deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
