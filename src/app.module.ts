import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EmpresasModule } from './empresas/empresas.module';
import { CandidatoModule } from './candidatos/candidatos.module';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';
import { VagasModule } from './vagas/vagas.module';
import { AplicacoesModule } from './aplicacoes/aplicacoes.module';
import { DevService } from './data/services/dev.service';
import { AppController } from './app.controller';
import { FaseModule } from './fase/fase.module';
import { ProgressoDoCandidatoModule } from './progresso-do-candidato/progresso-do-candidato.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    AuthModule,
    EmpresasModule,
    CandidatoModule,
    VagasModule,
    AplicacoesModule,
    FaseModule,
    ProgressoDoCandidatoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
