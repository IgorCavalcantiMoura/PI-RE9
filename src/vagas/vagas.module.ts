import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaga } from './entities/vagas.entity';
import { HttpModule } from '@nestjs/axios';
import { VagaService } from './services/vagas.service';
import { VagaController } from './controllers/vagas.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Vaga]), HttpModule],
    providers: [VagaService],
    controllers: [VagaController],
    exports: [TypeOrmModule]
  })
export class VagasModule {}
