import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aplicacao } from './entities/aplicacao.entity';
import { AplicacaoService } from './services/aplicacao.service';
import { AplicacaoController } from './controllers/aplicacao.controller';
import { CandidatoModule } from '../candidatos/candidatos.module';
import { VagasModule } from '../vagas/vagas.module';
import { CandidatoService } from '../candidatos/services/candidato.service';
import { VagaService } from '../vagas/services/vagas.service';

@Module({
    imports: [TypeOrmModule.forFeature([Aplicacao]), CandidatoModule, VagasModule],
    providers: [AplicacaoService, CandidatoService, VagaService],
    controllers: [AplicacaoController]
})
export class AplicacoesModule {}
