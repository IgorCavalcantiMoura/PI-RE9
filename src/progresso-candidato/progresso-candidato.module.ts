import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressoCandidato } from './entities/progressoCandidato.entity';
import { ProgressoCandidatoService } from './services/progressoCandidato.service';
import { ProgressoCandidatoController } from './controllers/progressoCandidato.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProgressoCandidato])],
    providers: [ProgressoCandidatoService],
    controllers: [ProgressoCandidatoController],
    exports: [TypeOrmModule]
})
export class ProgressoCandidatoModule {}
