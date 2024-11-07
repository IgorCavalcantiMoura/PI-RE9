import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Vaga } from '../../vagas/entities/vagas.entity';
import { ProgressoCandidato } from '../../progresso-do-candidato/entities/progressoDoCandidato.entity';

@Entity({name: 'tb_fase'})
export class Fase {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único da fase', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: 'Nome da fase', example: 'Entrevista Técnica' })
  nome: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Descrição opcional da fase', example: 'Entrevista com o time técnico para avaliação de habilidades' })
  descricao: string;

  @ManyToOne(() => Vaga, (vaga) => vaga.fases, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'Vaga associada a esta fase', type: () => Vaga })
  vaga: Vaga;

  @OneToMany(() => ProgressoCandidato, (progressoCandidato) => progressoCandidato.fase)
  progressoCandidatos: ProgressoCandidato[];
}
