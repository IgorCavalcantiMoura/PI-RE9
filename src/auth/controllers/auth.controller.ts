import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { UsuarioLogin } from './../entities/usuariologin.entity';

@ApiTags('Autenticação')
@Controller("/usuarios")
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    @ApiOperation({ summary: 'Realiza o login do usuário' })
    @ApiResponse({
        status: 200,
        description: 'Login realizado com sucesso.',
        schema: {
            type: 'object',
            properties: {
                access_token: {
                    type: 'string',
                    example: 'token_aqui',
                },
            },
        },
    })
    async login(@Body() user: UsuarioLogin): Promise<any> {
        return this.authService.login(user);
    }
}
