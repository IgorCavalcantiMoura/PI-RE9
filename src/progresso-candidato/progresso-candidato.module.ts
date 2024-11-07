import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressoCandidato } from './entities/progressoCandidato.entity';
import { ProgressoCandidatoService } from './services/progressoCandidato.service';
import { ProgressoCandidatoController } from './controllers/progressoCandidato.controller';
import { AplicacoesModule } from '../aplicacoes/aplicacoes.module';
import { AplicacaoService } from '../aplicacoes/services/aplicacao.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProgressoCandidato]), AplicacoesModule],
    providers: [ProgressoCandidatoService, AplicacaoService],
    controllers: [ProgressoCandidatoController],
    exports: [TypeOrmModule]
})
export class ProgressoCandidatoModule {}
