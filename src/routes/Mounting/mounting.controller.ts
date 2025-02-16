import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DefaultErrorResponse } from "src/core/responses/DefaultResponse";
import { MountingResponse, MountingResponseGet } from "./dtos/mountingResponse.dto";
import { MountingCreateDto } from "./dtos/mountingCreate.dto";
import { Mounting } from "./entity/mounting.entity";
import { MountingUpdateDto } from "./dtos/mountingUpdate.dto";
import { MountingService } from "./mounting.service";

@ApiTags("Mounting")
@Controller("api/mounting")
export class MountingController {
  constructor(private readonly mountingService: MountingService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Criação de uma nova montagem",
    description: "Criação de uma nova montagem",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Montagem criado com sucesso",
    type: MountingResponse,
  })
  @ApiBadRequestResponse({
    description: "Falha em criar uma nova montagem.",
    type: DefaultErrorResponse,
  })
  public async create(@Body() mounting: MountingCreateDto): Promise<Mounting | string> {
    return this.mountingService.create(mounting);
  }

  @Get()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Busca por todos as montagem",
    description: "Busca por todos as montagem",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Montagem buscado com sucesso",
    type: [MountingResponseGet],
  })
  @ApiBadRequestResponse({
    description: "Falha em processar a informação.",
    type: DefaultErrorResponse,
  })
  public async findAll(): Promise<Mounting[] | string> {
    return this.mountingService.findAll();
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
    description: "Montagem buscado com sucesso",
    type: MountingResponseGet,
  })
  @ApiBadRequestResponse({
    description: "Falha em processar a informação.",
    type: DefaultErrorResponse,
  })
  public async findById(@Param("id") id: number): Promise<Mounting | string> {
    return this.mountingService.findById(id);
  }

  @Put(":id")
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Atualização de uma montagem",
    description: "Atualização de uma montagem",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Montagem atualizado com sucesso",
    type: MountingResponse,
  })
  @ApiBadRequestResponse({
    description: "Falha em atualizar uma montagem.",
    type: DefaultErrorResponse,
  })
  public async update(@Param("id") id: number, @Body() project: MountingUpdateDto): Promise<Mounting | string> {
    return this.mountingService.update(id, project);
  }

  @Delete(":id")
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Exclusão de uma montagem",
    description: "Exclusão de uma montagem",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Montagem excluida com sucesso",
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: "Falha em excluir a informação.",
    type: DefaultErrorResponse,
  })
  public async delete(@Param("id") id: number): Promise<boolean | string> {
    return this.mountingService.delete(id);
  }
}
