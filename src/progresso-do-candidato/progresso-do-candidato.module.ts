import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressoCandidato } from './entities/progressoDoCandidato.entity';
import { AplicacoesModule } from '../aplicacoes/aplicacoes.module';
import { FaseModule } from '../fase/fase.module';
import { ProgressoCandidatoService } from './services/progressoDoCandidato.service';
import { AplicacaoService } from '../aplicacoes/services/aplicacao.service';
import { FaseService } from '../fase/services/fase.service';
import { ProgressoCandidatoController } from './controllers/progressoDoCandidato.controller';
import { CandidatoModule } from '../candidatos/candidatos.module';
import { CandidatoService } from '../candidatos/services/candidato.service';
import { VagasModule } from '../vagas/vagas.module';
import { HttpModule } from '@nestjs/axios';
import { VagaService } from '../vagas/services/vagas.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProgressoCandidato]),AplicacoesModule, FaseModule, CandidatoModule, VagasModule, HttpModule],
    providers: [ProgressoCandidatoService, AplicacaoService, FaseService, CandidatoService, VagaService],
    controllers: [ProgressoCandidatoController],
    exports: [TypeOrmModule]
})
export class ProgressoDoCandidatoModule {}
