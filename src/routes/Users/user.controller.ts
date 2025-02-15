import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserCreateDto } from "./dtos/userCreate.dto";
import { User } from "./entity/user.entity";
import { DefaultErrorResponse } from "src/core/responses/DefaultResponse";
import { UserResponse } from "./dtos/userReponse.dto";
import { UserUpdatedDto } from "./dtos/userUpdate.dto";

@ApiTags("User")
@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Criação de um novo usuário",
    description: "Criação de um novo usuário",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Usuário criado com sucesso",
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: "Falha em criar um novo usuário.",
    type: DefaultErrorResponse,
  })
  public async create(@Body() user: UserCreateDto): Promise<User | string> {
    return this.userService.create(user);
  }

  @Get()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Busca por todos os usuários",
    description: "Busca por todos os usuários",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Usuários buscado com sucesso",
    type: [UserResponse],
  })
  @ApiBadRequestResponse({
    description: "Falha em processar a informação.",
    type: DefaultErrorResponse,
  })
  public async findAll(): Promise<User[] | string> {
    return this.userService.findAll();
  }

  @Get(":id")
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Busca por apenas um usuário",
    description: "Busca por apenas um usuário",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Usuário buscado com sucesso",
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: "Falha em processar a informação.",
    type: DefaultErrorResponse,
  })
  public async findById(@Param("id") id: number): Promise<User | string> {
    return this.userService.findById(id);
  }

  @Put(":id")
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Atualização de um usuário",
    description: "Atualização de um usuário",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Usuário atualizado com sucesso",
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: "Falha em atualizar um usuário.",
    type: DefaultErrorResponse,
  })
  public async update(@Param("id") id: number, @Body() user: UserUpdatedDto): Promise<User | string> {
    return this.userService.update(id, user);
  }

  @Delete(":id")
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Exclusão de um usuários",
    description: "Exclusão de um usuários",
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
    return this.userService.delete(id);
  }
}
