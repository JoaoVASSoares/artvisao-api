import { ApiProperty } from "@nestjs/swagger";
import { ProjectResponseMounting } from "src/routes/Projects/dtos/projectResponse.dto";
import { UserResponse } from "src/routes/Users/dtos/userReponse.dto";

export class MountingResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  mountigDate: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;
}

export class MountingResponseGet {
  @ApiProperty()
  id: string;

  @ApiProperty()
  mountigDate: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  projectId: number;

  @ApiProperty()
  user: UserResponse;

  @ApiProperty()
  project: ProjectResponseMounting;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;
}
