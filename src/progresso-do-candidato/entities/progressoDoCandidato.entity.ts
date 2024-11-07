import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Aplicacao } from '../../aplicacoes/entities/aplicacao.entity';
import { Fase } from '../../fase/entities/fase.entity';


@Entity('progresso_candidato')
export class ProgressoCandidato {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aplicacao, (aplicacao) => aplicacao.progressoCandidatos)
  @JoinColumn({ name: 'aplicacao_id' })
  aplicacao: Aplicacao;

  @ManyToOne(() => Fase, (fase) => fase.progressoCandidatos)
  @JoinColumn({ name: 'fase_id' })
  fase: Fase;

  @Column()
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_criacao: Date;
}
