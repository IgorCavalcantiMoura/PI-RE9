import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { EmpresaLocalAuthGuard } from '../guard/empresa-local-auth-guard';
import { CandidatoLocalAuthGuard } from '../guard/candidato-local-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(EmpresaLocalAuthGuard)
  @Post('login/empresa')
  @ApiOperation({ summary: 'Autenticar empresa' })
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido para a empresa',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async loginEmpresa(@Request() req) {
    return this.authService.login(req.user, 'empresa');
  }

  @UseGuards(CandidatoLocalAuthGuard)
  @Post('login/candidato')
  @ApiOperation({ summary: 'Autenticar candidato' })
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido para o candidato',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async loginCandidato(@Request() req) {
    return this.authService.login(req.user, 'candidato');
  }
}
