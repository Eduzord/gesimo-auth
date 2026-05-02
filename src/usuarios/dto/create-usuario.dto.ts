import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome!: string;

  @IsEmail({}, { message: 'O e-mail deve ser válido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  senha!: string; // Senha em texto puro vinda do front-end

  @IsInt({ message: 'O ID da Role deve ser um número inteiro' })
  @IsNotEmpty({ message: 'O ID da Role é obrigatório' })
  id_role!: number;

  @IsOptional()
  @IsInt()
  status?: number; // Opcional, pois o banco já tem default 1
}