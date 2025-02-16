import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserCreateDto {
  @ApiProperty({ description: "Nome do usuário", format: "string", type: "string" })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({ description: "Contact email" })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim().toLowerCase())
  email: string;

  @ApiProperty({ description: "O número do contato deve ter o no mínimo 10 ou no máximo 11 caracteres" })
  @IsString()
  @IsNotEmpty()
  @Length(10, 11, { message: "O telefone deve ter entre 10 e 11 dígitos" })
  @Transform(({ value }) => value.replace(/\D/g, "").trim())
  phone: string;
}
