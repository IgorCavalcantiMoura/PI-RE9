import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Candidato } from "../../candidatos/entities/candidato.entity";
import { Empresa } from "../../empresas/entities/empresa.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Vaga } from "../../vagas/entities/vagas.entity";
import { Aplicacao } from "../../aplicacoes/entities/aplicacao.entity";
import { Fase } from "../../fase/entities/fase.entity";


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
            entities: [Usuario, Empresa, Candidato, Vaga, Aplicacao, Fase],
            synchronize: true,
    };
  }
}