import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Vaga } from '../../vagas/entities/vagas.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_empresas' })
export class Empresa {
  @ApiProperty({ description: 'Identificador único da empresa', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Tech Solutions Ltda',
  })
  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @ApiProperty({
    description: 'Endereço da empresa',
    example: 'Rua das Flores, 123',
  })
  @Column({ type: 'varchar', length: 255 })
  endereco: string;

  @ApiProperty({ description: 'CEP da empresa', example: '12345-678' })
  @Column({ type: 'varchar' })
  cep: string;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2023-01-01T00:00:00Z',
  })
  @CreateDateColumn()
  data_criacao: Date;

  @ApiProperty({
    description: 'Data de atualização do registro',
    example: '2023-01-15T00:00:00Z',
  })
  @UpdateDateColumn()
  data_atualizacao: Date;

  @ApiProperty({
    description: 'Lista de vagas associadas à empresa',
    type: () => [Vaga],
  })
  @OneToMany(() => Vaga, (vaga) => vaga.empresa)
  vagas: Vaga[];
}
