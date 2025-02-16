import { PartialType } from "@nestjs/swagger";
import { ProjectCreateDto } from "./projectCreate.dto";

export class ProjectUpdateDto extends PartialType(ProjectCreateDto) {}
