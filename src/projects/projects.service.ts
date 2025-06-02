import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { S3Service } from '../common/services/s3.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly s3Service: S3Service,
  ) {}

  async create(createProjectDto: CreateProjectDto, image: Express.Multer.File): Promise<Project> {
    const imageUrl = await this.s3Service.uploadFile(image, 'projects');
    
    const project = this.projectRepository.create({
      ...createProjectDto,
      image: imageUrl,
    });

    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, image?: Express.Multer.File): Promise<Project> {
    const project = await this.findOne(id);
    
    let imageUrl = project.image;
    if (image) {
      // Delete old image
      await this.s3Service.deleteFile(project.image);
      // Upload new image
      imageUrl = await this.s3Service.uploadFile(image, 'projects');
    }

    Object.assign(project, updateProjectDto, { image: imageUrl });
    return this.projectRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.s3Service.deleteFile(project.image);
    await this.projectRepository.remove(project);
  }
}