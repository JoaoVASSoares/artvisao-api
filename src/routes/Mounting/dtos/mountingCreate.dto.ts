import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class MountingCreateDto {
  @ApiProperty({ description: "Data da visita", example: "2025-02-14" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
    message: "A data deve estar no formato YYYY-MM-DD e ser válida.",
  })
  @Transform(({ value }) => value?.trim())
  mountingDate: string;

  @ApiProperty({ description: "Identificador do usuário" })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: "Identificador do projeto" })
  @IsNotEmpty()
  projectId: number;
}
