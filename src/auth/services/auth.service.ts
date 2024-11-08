import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmpresasService } from '../../empresas/services/empresa.service';
import { CandidatoService } from '../../candidatos/services/candidato.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly empresasService: EmpresasService,
    private readonly candidatosService: CandidatoService,
  ) {}

  async validateEmpresa(email: string, senha: string) {
    const empresa = await this.empresasService.findByEmail(email);
    if (empresa && await empresa.verifyPassword(senha)) {
      return { id: empresa.id, email: empresa.email };
    }
    throw new UnauthorizedException('Credenciais inválidas para empresa');
  }

  async validateCandidato(email: string, senha: string) {
    const candidato = await this.candidatosService.findByEmail(email);
    if (candidato && await candidato.verifyPassword(senha)) {
      return { id: candidato.id, email: candidato.email };
    }
    throw new UnauthorizedException('Credenciais inválidas para candidato');
  }

  async login(user: any, userType: 'empresa' | 'candidato') {
    const payload = { sub: user.id, email: user.email, role: userType };
    return { access_token: this.jwtService.sign(payload) };
  }
}
