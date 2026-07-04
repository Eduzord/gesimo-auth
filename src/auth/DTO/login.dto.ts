import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class LoginDto {

  @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário' })
  @IsEmail({},{message: "O email deve ser válido."})
  @IsNotEmpty({message: "O email é obrigatório."})  
  email!: string;

  @ApiProperty({ example: 'Senha@123', description: 'Senha do usuário' })
  @IsString()
  @IsNotEmpty({message: "A senha é obrigatória."})
  senha!: string;  
}