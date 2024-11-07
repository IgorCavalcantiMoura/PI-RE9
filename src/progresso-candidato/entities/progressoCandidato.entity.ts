import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Aplicacao } from '../../aplicacoes/entities/aplicacao.entity';
import { Fase } from '../../fase/entities/fase.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProgressoCandidato {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identificador único do progresso do candidato' })
  id: number;

  @Column({ default: 'pendente' })
  @ApiProperty({ 
    description: 'Status atual do candidato na fase', 
    enum: ['pendente', 'em_andamento', 'concluido', 'reprovado'], 
    default: 'pendente' 
  })
  status: 'pendente' | 'em_andamento' | 'concluido' | 'reprovado';

  @ManyToOne(() => Aplicacao, (aplicacao) => aplicacao.progressoCandidato, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'Aplicação associada ao progresso do candidato' })
  aplicacao: Aplicacao;

  @ManyToOne(() => Fase, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'Fase associada ao progresso do candidato' })
  fase: Fase;
}
