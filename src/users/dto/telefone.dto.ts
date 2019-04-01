import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class TelefoneDto {
    @ApiModelProperty()
    @IsNotEmpty({ message: 'Ddd obrigatório' })
    readonly ddd: string;
    @ApiModelProperty()
    @IsNotEmpty({ message: 'Numero obrigatório' })
    readonly numero: string;
}
