import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Mounting } from "./entity/mounting.entity";
import { MountingCreateDto } from "./dtos/mountingCreate.dto";
import { MountingUpdateDto } from "./dtos/mountingUpdate.dto";

@Injectable()
export class MountingService {
  constructor(
    @InjectRepository(Mounting)
    private readonly mountingRepository: Repository<Mounting>,
  ) {}

  public async create(mountingData: MountingCreateDto): Promise<Mounting | string> {
    try {
      const mounting = await this.mountingRepository.save(mountingData);

      return mounting;
    } catch (error) {
      console.log(error, mountingData);
      throw new BadRequestException("Falha em criar uma nova montagem");
    }
  }

  public async findAll(): Promise<Mounting[] | string> {
    const mountings = await this.mountingRepository.find({
      select: {
        id: true,
        mountingDate: true,
        userId: true,
        projectId: true,
        user: {
          name: true,
          email: true,
          phone: true,
        },
        project: {
          name: true,
          visitDate: true,
          dateProjectStart: true,
          dateProjectEnd: true,
          description: true,
        },
        createdAt: true,
        updatedAt: true,
      },

      relations: ["user", "project"],
    });

    if (!mountings) {
      throw new BadRequestException("Falha em processar informações.");
    }

    return mountings;
  }

  public async findById(id: number): Promise<Mounting> {
    if (!id || isNaN(id) || id <= 0) {
      throw new BadRequestException("ID inválido. Deve ser um número positivo.");
    }

    const mounting = await this.mountingRepository.findOne({
      select: {
        id: true,
        mountingDate: true,
        userId: true,
        projectId: true,
        user: {
          name: true,
          email: true,
          phone: true,
        },
        project: {
          name: true,
          visitDate: true,
          dateProjectStart: true,
          dateProjectEnd: true,
          description: true,
        },
        createdAt: true,
        updatedAt: true,
      },
      where: { id },
      relations: ["user", "project"],
    });

    if (!mounting) {
      throw new BadRequestException("Montagem não encontrado.");
    }

    return mounting;
  }

  public async update(id: number, mountingData: MountingUpdateDto): Promise<Mounting | string> {
    const existingMounting = await this.findById(id);

    const updatedMounting = {
      ...existingMounting,
      ...mountingData,
    };

    try {
      delete updatedMounting.project;
      delete updatedMounting.user;

      return await this.mountingRepository.save(updatedMounting);
    } catch (error) {
      throw new BadRequestException("Não foi possivel atualizar a montagem, por favor tente novamente !");
    }
  }

  public async delete(id: number): Promise<boolean | string> {
    const mounting = await this.findById(id);

    const deleteMounting = await this.mountingRepository.delete(mounting.id);

    if (deleteMounting.affected) {
      return true;
    }
  }
}
