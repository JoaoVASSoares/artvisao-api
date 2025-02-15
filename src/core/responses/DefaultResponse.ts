import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class DefaultErrorResponse {
  @ApiProperty({
    type: [String],
    example: ["Erro ao processar a requisição."],
  })
  message: string[];

  @ApiProperty({ example: "Bad Request" })
  error: string;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;
}
