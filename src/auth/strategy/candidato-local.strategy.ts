// src/auth/strategies/candidato-local.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';


@Injectable()
export class CandidatoLocalStrategy extends PassportStrategy(Strategy, 'candidato-local') {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const candidato = await this.authService.validateCandidato(email, password);
    if (!candidato) {
      throw new UnauthorizedException('Credenciais inválidas para candidato');
    }
    return candidato;
  }
}
