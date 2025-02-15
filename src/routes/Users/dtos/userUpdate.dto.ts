import { PartialType } from "@nestjs/swagger";
import { UserCreateDto } from "./userCreate.dto";

export class UserUpdatedDto extends PartialType(UserCreateDto) {}
