import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome!: string;

  @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário' })
  @IsEmail({}, { message: 'O e-mail deve ser válido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email!: string;

  @ApiProperty({ example: 'Senha@123', description: 'Senha do usuário', minLength: 8 })
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @Matches(/(?=.*[A-Z])/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
  @Matches(/(?=.*[^a-zA-Z0-9])/, { message: 'A senha deve conter pelo menos um caractere especial' })
  senha!: string; // Senha em texto puro vinda do front-end

  @ApiProperty({ example: 1, description: 'ID da role do usuário' })
  @IsInt({ message: 'O ID da Role deve ser um número inteiro' })
  @IsNotEmpty({ message: 'O ID da Role é obrigatório' })
  id_role!: number;

  @ApiPropertyOptional({ example: 1, description: 'Status do usuário (ativo=1, inativo=0)' })
  @IsOptional()
  @IsInt()
  status?: number; // Opcional, pois o banco já tem default 1
}