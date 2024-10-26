import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Empresa } from './empresas/entities/empresa.entity';
import { EmpresasModule } from './empresas/empresas.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_re9',
      entities: [Usuario, Empresa],
      synchronize: true,
    }),
    AuthModule,
    UsuarioModule,
    EmpresasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
