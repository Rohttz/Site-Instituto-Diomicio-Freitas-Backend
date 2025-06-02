import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const activity = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(activity);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    const activity = await this.projectsRepository.findOneBy({ id });
    if (!activity) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return activity;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    // 1. Verifica se a atividade existe
    const existing = await this.projectsRepository.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  
    // 2. Atualiza a entidade (abordagem mais segura)
    const updated = await this.projectsRepository.save({
      ...existing,
      ...updateProjectDto
    });
  
    // 3. Retorna a entidade atualizada
    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}