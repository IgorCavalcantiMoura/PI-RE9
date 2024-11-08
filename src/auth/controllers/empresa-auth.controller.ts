import { Controller, Post, Body } from '@nestjs/common';
import { EmpresaAuthService } from '../services/empresa-auth.service';

@Controller('auth/empresa')
export class EmpresaAuthController {
  constructor(private readonly empresaAuthService: EmpresaAuthService) {}

  @Post('login')
  async login(@Body('email') email: string, @Body('senha') senha: string) {
    const empresa = await this.empresaAuthService.validarEmpresa(email, senha);
    if (!empresa) {
      throw new Error('Credenciais inválidas');
    }
    return this.empresaAuthService.login(empresa);
  }
}
