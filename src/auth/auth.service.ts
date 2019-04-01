import { Injectable, HttpException, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './intefaces/jwt-payload.interface';
import { SignInDto } from './../users/dto/signIn.dto';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async createToken(data: SignInDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new HttpException({
        error: 'Usuário e/ou senha inválidos',
      }, HttpStatus.UNAUTHORIZED);
    }
    const isValid = await user.validatePass(data.senha);
    if (!isValid) {
      throw new HttpException({
        error: 'Usuário e/ou senha inválidos',
      }, HttpStatus.FORBIDDEN);
    }
    const token = this.jwtService.sign({email: user.email});
    user.ultimo_login = new Date();
    await user.save();
    user.senha = undefined;
    return {
      token,
      user,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return this.usersService.findByEmail(payload.email);
  }
}
