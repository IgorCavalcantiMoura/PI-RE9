import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressoCandidato } from './entities/progressoCandidato.entity';
import { ProgressoCandidatoService } from './services/progressoCandidato.service';
import { ProgressoCandidatoController } from './controllers/progressoCandidato.controller';
import { AplicacoesModule } from '../aplicacoes/aplicacoes.module';
import { AplicacaoService } from '../aplicacoes/services/aplicacao.service';
import { FaseModule } from '../fase/fase.module';
import { FaseService } from '../fase/services/fase.service';
import { CandidatoModule } from '../candidatos/candidatos.module';
import { CandidatoService } from '../candidatos/services/candidato.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProgressoCandidato]), AplicacoesModule, FaseModule, CandidatoModule],
    providers: [ProgressoCandidatoService, AplicacaoService, FaseService, CandidatoService],
    controllers: [ProgressoCandidatoController],
    exports: [TypeOrmModule]
})
export class ProgressoCandidatoModule {}
