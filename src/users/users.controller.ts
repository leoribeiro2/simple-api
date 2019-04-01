import { Controller, Get, Post, Body, Param, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    @ApiOperation({ title: 'Cadastra novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado'})
    @ApiResponse({ status: 401, description: 'Não autorizado'})
    signUp(@Body() body: SignUpDto) {
        return this.userService.signUp(body);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ title: 'Busca usuário por ID' })
    @ApiResponse({ status: 200, description: 'Retorna os dados do usuário'})
    @ApiResponse({ status: 401, description: 'Não autorizado'})
    @ApiBearerAuth()
    getUser(@Param('id') id: string, @Req() req) {
        // tslint:disable-next-line:triple-equals
        if (req.user._id != id) {
            throw new HttpException({
                erro: 'Não autorizado',
            }, HttpStatus.UNAUTHORIZED);
        }
        return this.userService.getUser(id);
    }
}
