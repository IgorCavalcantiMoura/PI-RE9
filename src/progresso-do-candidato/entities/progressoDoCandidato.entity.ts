import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Aplicacao } from '../../aplicacoes/entities/aplicacao.entity';
import { Fase } from '../../fase/entities/fase.entity';

@Entity('progresso_candidato')
export class ProgressoCandidato {
  
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único do progresso do candidato' })
  id: number;

  @ManyToOne(() => Aplicacao, (aplicacao) => aplicacao.progressoCandidatos)
  @JoinColumn({ name: 'aplicacao_id' })
  @ApiProperty({ description: 'Aplicação associada ao progresso do candidato', type: () => Aplicacao })
  aplicacao: Aplicacao;

  @ManyToOne(() => Fase, (fase) => fase.progressoCandidatos)
  @JoinColumn({ name: 'fase_id' })
  @ApiProperty({ description: 'Fase do progresso do candidato', type: () => Fase })
  fase: Fase;

  @Column()
  @ApiProperty({ description: 'Status atual do progresso do candidato' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ description: 'Data de criação do registro do progresso', example: '2024-11-07T03:00:00.000Z' })
  data_criacao: Date;
}
