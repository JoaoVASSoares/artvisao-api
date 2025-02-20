import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from "class-validator";

export class ProjectCreateDto {
  @ApiProperty({ description: "Nome do projeto", format: "string", type: "string" })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({ description: "Data da visita", example: "2025-02-14" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
    message: "A data deve estar no formato YYYY-MM-DD e ser válida.",
  })
  @Transform(({ value }) => value?.trim())
  visitDate: string;

  @ApiProperty({ description: "Identificador do usuário" })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: "Data de início do projeto", example: "2025-02-14" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
    message: "A data deve estar no formato YYYY-MM-DD e ser válida.",
  })
  @Transform(({ value }) => value?.trim())
  dateProjectStart: string;

  @ApiProperty({ description: "Data de finalização do projeto", example: "2025-02-14" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
    message: "A data deve estar no formato YYYY-MM-DD e ser válida.",
  })
  @Transform(({ value }) => value?.trim())
  dateProjectEnd: string;

  @ApiPropertyOptional({ description: "Descrição do projeto" })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  @Transform(({ value }) => value?.trim())
  description: string;
}
