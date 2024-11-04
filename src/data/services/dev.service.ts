import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Candidato } from "../../candidatos/entities/candidato.entity";
import { Empresa } from "../../empresas/entities/empresa.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";


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
            entities: [Usuario, Empresa, Candidato],
            synchronize: true,
    };
  }
}