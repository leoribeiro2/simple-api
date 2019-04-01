import { TelefoneDto } from './telefone.dto';
import { IsNotEmpty, ValidateNested, registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SignUpDto {
    @ApiModelProperty()
    @IsNotEmpty({ message: 'Nome obrigatório' })
    readonly nome: string;
    @ApiModelProperty()
    @IsNotEmpty({ message: 'E-mail obrigatório' })
    readonly email: string;
    @ApiModelProperty()
    @IsNotEmpty({ message: 'Senha obrigatório' })
    readonly senha: string;
    @ApiModelProperty({ type: TelefoneDto, isArray: true })
    @Type(() => TelefoneDto)
    @ValidateNested({ each: true })
    @IsNonPrimitiveArray()
    readonly telefones: TelefoneDto[];
}

export function IsNonPrimitiveArray(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsNonPrimitiveArray',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return Array.isArray(value) && value.reduce((a, b) => a && typeof b === 'object' && !Array.isArray(b), true);
        },
      },
    });
  };
}
