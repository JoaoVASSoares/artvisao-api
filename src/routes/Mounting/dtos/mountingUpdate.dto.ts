import { PartialType } from "@nestjs/swagger";
import { MountingCreateDto } from "./mountingCreate.dto";

export class MountingUpdateDto extends PartialType(MountingCreateDto) {}
