import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { EmpresaLocalAuthGuard } from '../guard/empresa-local-auth-guard';
import { CandidatoLocalAuthGuard } from '../guard/candidato-local-auth-guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(EmpresaLocalAuthGuard)
  @Post('login/empresa')
  async loginEmpresa(@Request() req) {
    return this.authService.login(req.user, 'empresa');
  }

  @UseGuards(CandidatoLocalAuthGuard)
  @Post('login/candidato')
  async loginCandidato(@Request() req) {
    return this.authService.login(req.user, 'candidato');
  }
}
