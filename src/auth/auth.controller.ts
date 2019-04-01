import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './../users/dto/signIn.dto';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Retorna o token de autenticacao e os dados do usuário'})
  @ApiResponse({ status: 401, description: 'Não autorizado'})
  @ApiOperation({ title: 'Autentica um usuário' })
  async createToken(@Body() data: SignInDto): Promise<any> {
    return await this.authService.createToken(data);
  }
}
