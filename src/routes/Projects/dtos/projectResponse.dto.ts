import { ApiProperty } from "@nestjs/swagger";
import { UserResponse } from "src/routes/Users/dtos/userReponse.dto";

export class ProjectResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  visitDate: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  dateProjectStart: string;

  @ApiProperty()
  dateProjectEnd: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;
}

export class ProjectResponseMounting {
  @ApiProperty()
  id: string;

  @ApiProperty()
  visitDate: string;

  @ApiProperty()
  dateProjectStart: string;

  @ApiProperty()
  dateProjectEnd: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;
}

export class ProjectResponseGet {
  @ApiProperty()
  id: string;

  @ApiProperty()
  visitDate: string;

  @ApiProperty()
  dateProjectStart: string;

  @ApiProperty()
  dateProjectEnd: string;

  @ApiProperty()
  user: UserResponse;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;
}
