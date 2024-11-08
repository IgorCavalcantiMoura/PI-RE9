// src/auth/strategies/empresa-local.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';


@Injectable()
export class EmpresaLocalStrategy extends PassportStrategy(Strategy, 'empresa-local') {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const empresa = await this.authService.validateEmpresa(email, password);
    if (!empresa) {
      throw new UnauthorizedException('Credenciais inválidas para empresa');
    }
    return empresa;
  }
}
