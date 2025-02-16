import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProjectService } from "./projects.service";
import { ProjectResponse, ProjectResponseGet } from "./dtos/projectResponse.dto";
import { DefaultErrorResponse } from "src/core/responses/DefaultResponse";
import { ProjectCreateDto } from "./dtos/projectCreate.dto";
import { Project } from "./entity/project.entity";
import { ProjectUpdateDto } from "./dtos/projectUpdate.dto";

@ApiTags("Project")
@Controller("api/project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Criação de um novo projeto",
    description: "Criação de um novo projeto",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Projeto criado com sucesso",
    type: ProjectResponse,
  })
  @ApiBadRequestResponse({
    description: "Falha em criar um novo Projeto.",
    type: DefaultErrorResponse,
  })
  public async create(@Body() project: ProjectCreateDto): Promise<Project | string> {
    return this.projectService.create(project);
  }

  @Get()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Busca por todos os projetos",
    description: "Busca por todos os projetos",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Projetos buscado com sucesso",
    type: [ProjectResponseGet],
  })
  @ApiBadRequestResponse({
    description: "Falha em processar a informação.",
    type: DefaultErrorResponse,
  })
  public async findAll(): Promise<Project[] | string> {
    return this.projectService.findAll();
  }

  @Get(":id")
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Busca por apenas um projeto",
    description: "Busca por apenas um projeto",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Projeto buscado com sucesso",
    type: ProjectResponse,
  })
  @ApiBadRequestResponse({
    description: "Falha em processar a informação.",
    type: DefaultErrorResponse,
  })
  public async findById(@Param("id") id: number): Promise<Project | string> {
    return this.projectService.findById(id);
  }

  @Put(":id")
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Atualização de um projeto",
    description: "Atualização de um projeto",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Projeto atualizado com sucesso",
    type: ProjectResponse,
  })
  @ApiBadRequestResponse({
    description: "Falha em atualizar um projeto.",
    type: DefaultErrorResponse,
  })
  public async update(@Param("id") id: number, @Body() project: ProjectUpdateDto): Promise<Project | string> {
    return this.projectService.update(id, project);
  }

  @Delete(":id")
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Exclusão de um projeto",
    description: "Exclusão de um projeto",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Usuário excluido com sucesso",
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: "Falha em excluir a informação.",
    type: DefaultErrorResponse,
  })
  public async delete(@Param("id") id: number): Promise<boolean | string> {
    return this.projectService.delete(id);
  }
}
