import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Nome da role' })
    @IsString({ message: 'O nome da role deve ser um texto' })
    @IsNotEmpty({ message: 'O nome da role é obrigatório' })
    @MaxLength(50, { message: 'O nome da role deve ter no máximo 50 caracteres' })
    role!: string;
}
