import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Candidato } from "../../candidatos/entities/candidato.entity";
import { Empresa } from "../../empresas/entities/empresa.entity";
import { Vaga } from "../../vagas/entities/vagas.entity";
import { Aplicacao } from "../../aplicacoes/entities/aplicacao.entity";
import { Fase } from "../../fase/entities/fase.entity";
import { ProgressoCandidato } from "../../progresso-do-candidato/entities/progressoDoCandidato.entity";


@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'db_re9',
            entities: [Empresa, Candidato, Vaga, Aplicacao, Fase, ProgressoCandidato],
            synchronize: true,
    };
  }
}