import { Repository } from "typeorm";
import { Project } from "./entity/project.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ProjectCreateDto } from "./dtos/projectCreate.dto";
import { ProjectUpdateDto } from "./dtos/projectUpdate.dto";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  public async create(projectData: ProjectCreateDto): Promise<Project | string> {
    try {
      const project = await this.projectRepository.save(projectData);

      return project;
    } catch (error) {
      throw new BadRequestException("Falha em criar um novo projeto.");
    }
  }

  public async findAll(): Promise<Project[] | string> {
    const projects = await this.projectRepository.find({
      select: {
        id: true,
        name: true,
        visitDate: true,
        userId: true,
        dateProjectStart: true,
        dateProjectEnd: true,
        user: {
          name: true,
          email: true,
          phone: true,
        },
        createdAt: true,
        updatedAt: true,
      },
      relations: ["user"],
    });

    if (!projects) {
      throw new BadRequestException("Falha em processar informações.");
    }

    return projects;
  }

  public async findById(id: number): Promise<Project> {
    if (!id || isNaN(id) || id <= 0) {
      throw new BadRequestException("ID inválido. Deve ser um número positivo.");
    }

    const project = await this.projectRepository.findOne({
      select: {
        id: true,
        name: true,
        visitDate: true,
        userId: true,
        dateProjectStart: true,
        dateProjectEnd: true,
        user: {
          name: true,
          email: true,
          phone: true,
        },
        createdAt: true,
        updatedAt: true,
      },
      where: { id },
      relations: ["user"],
    });

    if (!project) {
      throw new BadRequestException("Projeto não encontrado.");
    }

    return project;
  }

  public async update(id: number, projectData: ProjectUpdateDto): Promise<Project | string> {
    const existingProject = await this.findById(id);

    const updatedProject = {
      ...existingProject,
      ...projectData,
    };

    try {
      return await this.projectRepository.save(updatedProject);
    } catch (error) {
      throw new BadRequestException("Não foi possivel atualizar o projeto, por favor tente novamente !");
    }
  }

  public async delete(id: number): Promise<boolean | string> {
    const project = await this.findById(id);

    const deleteProject = await this.projectRepository.delete(project.id);

    if (deleteProject.affected) {
      return true;
    }
  }
}
