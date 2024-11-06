import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EmpresasModule } from './empresas/empresas.module';
import { CandidatoModule } from './candidatos/candidatos.module';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';
import { VagasModule } from './vagas/vagas.module';
import { AplicacoesModule } from './aplicacoes/aplicacoes.module';
import { DevService } from './data/services/dev.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    AuthModule,
    UsuarioModule,
    EmpresasModule,
    CandidatoModule,
    VagasModule,
    AplicacoesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
