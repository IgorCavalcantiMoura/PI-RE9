import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Aplicacao } from '../../aplicacoes/entities/aplicacao.entity';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'tb_candidatos' })
export class Candidato {
  @ApiProperty({ description: 'ID único do candidato' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome do candidato', maxLength: 255 })
  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @ApiProperty({ description: 'Endereço do candidato', maxLength: 255 })
  @Column({ type: 'varchar', length: 255 })
  endereco: string;

  @ApiProperty({ description: 'CEP do candidato', maxLength: 10 })
  @Column({ type: 'varchar', length: 10 })
  cep: string;

  @ApiProperty({ description: 'Telefone do candidato', maxLength: 15 })
  @Column({ type: 'varchar', length: 15 })
  telefone: string;

  @ApiProperty({ description: 'Email único do candidato', maxLength: 255 })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column()
  senha: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.senha) {
      this.senha = await bcrypt.hash(this.senha, 10);
    }
  }

  async verifyPassword(senha: string): Promise<boolean> {
    return await bcrypt.compare(senha, this.senha);
  }

  @ApiProperty({
    description: 'Currículo em formato de arquivo',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @Column({ type: 'blob', nullable: true })
  curriculo: Buffer;

  @ApiProperty({ description: 'Data de criação do registro', type: Date })
  @CreateDateColumn()
  data_criacao: Date;

  @ApiProperty({ description: 'Data de atualização do registro', type: Date })
  @UpdateDateColumn()
  data_atualizacao: Date;

  @ApiProperty({
    description: 'Lista de aplicações feitas pelo candidato',
    type: () => [Aplicacao],
  })
  @OneToMany(() => Aplicacao, (aplicacao) => aplicacao.candidato)
  aplicacoes: Aplicacao[];
}
