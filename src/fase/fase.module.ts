import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VagasModule } from '../vagas/vagas.module';
import { HttpModule } from '@nestjs/axios';
import { VagaService } from '../vagas/services/vagas.service';
import { Fase } from './entities/fase.entity';
import { VagaController } from '../vagas/controllers/vagas.controller';
import { FaseService } from './services/fase.service';
import { FaseController } from './controllers/fase.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fase]), VagasModule, HttpModule],
  providers: [FaseService, VagaService],
  controllers: [FaseController],
  exports: [TypeOrmModule],
})
export class FaseModule {}
