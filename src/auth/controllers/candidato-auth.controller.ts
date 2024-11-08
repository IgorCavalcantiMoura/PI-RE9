import { Controller, Post, Body } from '@nestjs/common';
import { CandidatoAuthService } from '../services/candidato-auth.service';

@Controller('auth/candidato')
export class CandidatoAuthController {
  constructor(private readonly candidatoAuthService: CandidatoAuthService) {}

  @Post('login')
  async login(@Body('email') email: string, @Body('senha') senha: string) {
    const candidato = await this.candidatoAuthService.validarCandidato(email, senha);
    if (!candidato) {
      throw new Error('Credenciais inválidas');
    }
    return this.candidatoAuthService.login(candidato);
  }
}
