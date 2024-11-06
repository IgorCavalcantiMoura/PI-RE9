import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Candidato } from '../../candidatos/entities/candidato.entity';
import { Vaga } from '../../vagas/entities/vagas.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_aplicacoes' })
@Unique(['candidato', 'vaga'])
export class Aplicacao {
  @ApiProperty({ description: 'ID único da aplicação' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Candidato que aplicou para a vaga',
    type: () => Candidato,
  })
  @ManyToOne(() => Candidato, (candidato) => candidato.aplicacoes, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'candidato_id' })
  candidato: Candidato;

  @ApiProperty({
    description: 'Vaga para a qual o candidato se aplicou',
    type: () => Vaga,
  })
  @ManyToOne(() => Vaga, (vaga) => vaga.aplicacoes, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vaga_id' })
  vaga: Vaga;
}
