import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SignInDto {
    @ApiModelProperty()
    @IsNotEmpty({ message: 'E-mail obrigatório' })
    readonly email: string;
    @ApiModelProperty()
    @IsNotEmpty({ message: 'Senha obrigatório' })
    readonly senha: string;
}
