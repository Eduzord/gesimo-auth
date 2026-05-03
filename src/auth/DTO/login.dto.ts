import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class LoginDto {

  @IsEmail({},{message: "O email deve ser válido."})
  @IsNotEmpty({message: "O email é obrigatório."})  
  email!: string;

  @IsString()
  @IsNotEmpty({message: "A senha é obrigatória."})
  senha!: string;  
}