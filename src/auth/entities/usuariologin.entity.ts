import { ApiProperty } from '@nestjs/swagger';

export class UsuarioLogin {
  
  @ApiProperty({
    description: 'Nome de usuário para login',
    example: 'johndoe@example.com',
  })
  public usuario: string;

  @ApiProperty({
    description: 'Senha do usuário para login',
    example: 'senha123',
  })
  public senha: string;
}
