import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Aplicacao } from '../../aplicacoes/entities/aplicacao.entity';
import { Empresa } from '../../empresas/entities/empresa.entity';
import { ApiProperty } from '@nestjs/swagger'; 

@Entity({ name: 'tb_vagas' })
export class Vaga {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identificador único da vaga', example: 1 })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({
    description: 'Título da vaga',
    example: 'Desenvolvedor Backend',
  })
  titulo: string;

  @Column({ type: 'date' })
  @ApiProperty({
    description: 'Data de abertura da vaga',
    example: '2024-11-01',
  })
  dataDeAbertura: Date;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({
    description: 'Data de encerramento da vaga',
    example: '2024-12-01',
    required: false,
  })
  dataDeEncerramento: Date;

  @Column({ type: 'varchar', length: 200 })
  @ApiProperty({
    description: 'CEP da empresa que oferece a vaga',
    example: '12345-678',
  })
  cep: string;

  @Column({ type: 'text' })
  @ApiProperty({
    description: 'Descrição da vaga',
    example: 'Vaga para desenvolvedor backend utilizando Node.js',
  })
  descricao: string;

  @Column({ type: 'text' })
  @ApiProperty({
    description: 'Responsabilidades da vaga',
    example: 'Desenvolver APIs, manutenções de sistemas, etc.',
  })
  responsabilidades: string;

  @Column({ type: 'text' })
  @ApiProperty({
    description: 'Requisitos da vaga',
    example: 'Experiência com Node.js e MongoDB',
  })
  requisitos: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description: 'Informações adicionais sobre a vaga',
    example: 'Remoto, horário flexível',
    required: false,
  })
  informacoesAdicionais: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.vagas, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  @OneToMany(() => Aplicacao, (aplicacao) => aplicacao.vaga)
  aplicacoes: Aplicacao[];
}
