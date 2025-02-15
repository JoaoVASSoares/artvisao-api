import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { UserCreateDto } from "./dtos/userCreate.dto";
import { UserUpdatedDto } from "./dtos/userUpdate.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(userData: UserCreateDto): Promise<User | string> {
    try {
      const userSave = await this.userRepository.save(userData);

      return userSave;
    } catch (error) {
      throw new BadRequestException("Falha em criar um novo usuário.");
    }
  }

  public async findAll(): Promise<User[] | string> {
    const users = await this.userRepository.find();

    if (!users) {
      throw new BadRequestException("Falha em processar informações.");
    }

    return users;
  }

  public async findById(id: number): Promise<User> {
    if (!id || isNaN(id) || id <= 0) {
      throw new BadRequestException("ID inválido. Deve ser um número positivo.");
    }

    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException("Usuário não encontrado.");
    }

    return user;
  }

  public async update(id: number, userData: UserUpdatedDto): Promise<User | string> {
    const existingContact = await this.findById(id);

    const updatedContact = {
      ...existingContact,
      ...userData,
    };

    try {
      return await this.userRepository.save(updatedContact);
    } catch (error) {
      throw new BadRequestException("Não foi possivel atualizar o usuário, por favor tente novamente !");
    }
  }

  public async delete(id: number): Promise<boolean | string> {
    const existingContact = await this.findById(id);

    const deleteUser = await this.userRepository.delete(existingContact.id);

    if (deleteUser.affected) {
      return true;
    }
  }
}
